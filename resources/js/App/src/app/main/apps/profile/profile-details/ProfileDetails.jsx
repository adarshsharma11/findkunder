import { useEffect, useState, useRef } from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";
import ProfileDetailTab from "../tabs/ProfileDetailTab";
import useThemeMediaQuery from "../../../../../@fuse/hooks/useThemeMediaQuery";
import { useForm } from "react-hook-form";
import {
 updateAccountProfileSchema,
  updateProfilePasswordSchema,
} from "../../../../schemas/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUserData } from "app/store/userSlice";
import AuthService from "../../../../auth/services/AuthService";
import { showMessage } from "app/store/fuse/messageSlice";
import authRoles from "../../../../auth/authRoles";
import history from '@history';
import SaveChangesDialog from "../../../../shared-components/save-changes-dialog";
import useNavigationPrompt from "../../../../hooks/use-navigation-prompt";
const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
}));

const defaultValues = {
    role: "user",
    first_name: "",
    last_name: "",
    email: "",
    telephone: "",
    company: "",
    cvr: "",
  };

const defaultSecurityValues = {
    oldPassword: "",
    password: "",
    passwordConfirm: "",
  };
function ProfileAppDetails() {
  const user = useSelector(selectUser);
  const isAdmin = user?.role === authRoles.admin[0];
  const isOwner = user?.role === authRoles.owner[0];
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(updateAccountProfileSchema),
  });
  const securityMethods = useForm({
    mode: "onChange",
    defaultValues: defaultSecurityValues,
    resolver: yupResolver(updateProfilePasswordSchema),
  });
  const { reset, formState, handleSubmit } = methods;
  const unblockRef = useRef(null);
  const { isDirty } = formState;
  const { handleSubmit: handleSubmitSecurity } = securityMethods;

  const handleSubmitProfile = async () => {
    // Trigger form validation and get the result
    const isValid = await methods.trigger();

    // If the form is valid and has changes, save the data
    if (isValid && isDirty) {
      return handleSubmit(async (values) => {
        const result = await handleUpdateProfile(values);
        return result; // Return the result to determine if navigation should proceed
      })();
    }

    // If the form is not valid, return false to prevent navigation
    // but still show validation errors
    return false;
  };

  const { handlePromptConfirm, handlePromptCancel, showPrompt } = useNavigationPrompt({
    isDirty,
    onSubmit: handleSubmitProfile,
    history,
    unblockRef,
  });

   useEffect(() => {
      if (user?.data) {
        const fullName = user.data.displayName || "";
        const nameParts = fullName.trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";
        const initialValues = {
          role: user.role,
          company: user.data.company,
          cvr: user.data.cvr,
          telephone: user.data.telephone,
          first_name: firstName,
          last_name: lastName,
          email: user.data.email,
        };
        reset(initialValues);
      }
    }, [user, reset]);


  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));


  const handleUpdateProfile = async (values) => {
    try {
      setLoading(true);
      const response = await AuthService.updateUserData(values, 1);
      const { data: result } = response;

      if (!result?.status && result?.errors) {
        dispatch(showMessage({ message: result.errors, variant: 'error' }));
        return false;
      }

      const userInfo = result?.user;
      if (!userInfo) return false;

      const newUser = {
        uuid: userInfo.id,
        from: "custom-db",
        role: response.data.role,
        data: {
          displayName: userInfo.name,
          email: userInfo.email,
          totalCompanies: userInfo.companies_count,
          totalProfiles: userInfo.customers_count,
          totalContactPersons: userInfo.contact_person_count,
          company: userInfo.company,
          cvr: userInfo.cvr,
          telephone: userInfo.telephone,
          is_profile_completed: userInfo.is_profile_completed,
          settings: {},
          shortcuts: []
        }
      };

      dispatch(updateUserData(newUser));
      dispatch(showMessage({
        message: "Profile updated successfully!",
        variant: 'success'
      }));
      return true;

    } catch (error) {
      dispatch(showMessage({
        message: "Failed to update profile.",
        variant: "error"
      }));
      return false;
    } finally {
      setLoading(false);
    }
  };

const handleSubmitSecurityProfile = async () => {
    handleSubmitSecurity(async (values) => {
        setLoadingPassword(true);
        await handleUpdateProfile(values);
        setLoadingPassword(false);
    })();
};

  const handleDeleteProfile = () => {
    AuthService.deleteProfile()
      .then((response) => {
        const result = response?.data;
        const errorMessage = result?.errors;
        if (!result.status && errorMessage) {
          dispatch(showMessage({ message: errorMessage }));
          return;
        }
        dispatch(showMessage({ message: "Profile deleted successfully!" }));
        AuthService.logout();
      })
      .catch((error) => {
        const errorMessage = "Failed to delete profile.";
        dispatch(showMessage({ message: errorMessage, variant: "error" }));
      });
  };

  return (
    <Root
      content={
        <div className="flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32">
          <ProfileDetailTab
            user={user}
            isAdmin={isAdmin}
            isOwner={isOwner}
            handleDeleteProfile={handleDeleteProfile}
            handleUpdateProfile={handleSubmitProfile}
            handleSubmitSecurityProfile={handleSubmitSecurityProfile}
            loading={loading}
            loadingPassword={loadingPassword}
            methods={methods}
            securityMethods={securityMethods}
          />
          <SaveChangesDialog
            open={showPrompt}
            onConfirm={handlePromptConfirm}
            onClose={handlePromptCancel}
          />
        </div>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default ProfileAppDetails;

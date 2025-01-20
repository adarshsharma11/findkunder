import { useEffect, useState } from "react";
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
  const { reset, watch, control, onChange, formState, setValue, handleSubmit } = methods;
  const { handleSubmit: handleSubmitSecurity } = securityMethods;

   useEffect(() => {
      if (user?.data) {
        const fullName = user.data.displayName || "";
        const nameParts = fullName.trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";
        setValue("role", user.role);
        setValue("company", user.data.company);
        setValue("cvr", user.data.cvr);
        setValue("telephone", user.data.telephone);
        setValue("first_name", firstName);
        setValue("last_name", lastName);
        setValue("email", user.data.email);
      }
    }, [user, setValue]);


  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  

  const handleUpdateProfile = async (values) => {
    try {
      setLoading(true)
      const is_profile_completed = 1;
      const response = await AuthService.updateUserData(values, is_profile_completed);
      const result = response?.data;

      if (!result.status && result.errors) {
        dispatch(showMessage({ message: result.errors, variant: 'error' }));
        return false;
      }

      const userInfo = result?.user;
      if (userInfo) {
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
            shortcuts: [],
          },
        };
        dispatch(updateUserData(newUser));
        dispatch(showMessage({ message: "Profile updated successfully!", variant: 'success'}));
        return true;
      }
    } catch (error) {
      dispatch(showMessage({ message: "Failed to update profile.", variant: "error" }));
      return false;
    } finally {
      setLoading(false)
    }
  };

const handleSubmitProfile = async () => {
handleSubmit(async (values) => {
    await handleUpdateProfile(values);
    })();
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
        <ProfileDetailTab user={user} isAdmin={isAdmin} isOwner={isOwner} handleDeleteProfile={handleDeleteProfile} handleUpdateProfile={handleSubmitProfile} handleSubmitSecurityProfile={handleSubmitSecurityProfile} loading={loading} loadingPassword={loadingPassword} methods={methods} securityMethods={securityMethods} />
        </div>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default ProfileAppDetails;

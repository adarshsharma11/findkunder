import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { LoadingButton } from "@mui/lab";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { motion } from "framer-motion";
import { FormProvider } from "react-hook-form";
import DeleteAccountTab from "./DeleteAccountTab";
import UpdatePasswordTab from "./UpdatePasswordTab";
import UpdateProfile from "../../../../shared-components/welcome-dialog/steps/UpdateProfile";

function ProfileDetailTab(props) {
  const { user, isAdmin, isOwner, handleDeleteProfile, handleUpdateProfile, loading, methods, securityMethods, handleSubmitSecurityProfile, loadingPassword } = props;
  if (!user) {
    return null;
  }

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full">
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <div className="md:flex">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32">
            <CardContent className="px-32 py-24 w-full">
            <FormProvider {...methods}> <UpdateProfile /> </FormProvider>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:w-320" >
        <div className="w-3/4 mb-12">
        <LoadingButton
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="primary"
          loading={loading}
          onClick={handleUpdateProfile}
          startIcon={<FuseSvgIcon size={20}>heroicons-solid:bookmark</FuseSvgIcon>}
        >
             Update
        </LoadingButton>
        </div>
        <div className="w-3/4 mb-12">
        <FormProvider {...securityMethods}><UpdatePasswordTab handleUpdateProfile={handleSubmitSecurityProfile} loading={loadingPassword} /> </FormProvider>
        </div>
        {!isAdmin && !isOwner && <DeleteAccountTab handleDeleteProfile={handleDeleteProfile} /> }
        </div>
      </div>
    </motion.div>
    </div>
  );
}

export default ProfileDetailTab;

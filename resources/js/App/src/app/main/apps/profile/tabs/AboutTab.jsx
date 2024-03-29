import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import DeleteAccountTab from "./DeleteAccountTab";
import UpdatePasswordTab from "./UpdatePasswordTab";

function AboutTab(props) {
  const { user, isAdmin, handleDeleteProfile, handleUpdateProfile } = props;

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
            <div className="px-32 pt-24">
              <Typography className="text-2xl font-semibold leading-tight">
                General Information
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Email
                </Typography>
                <Typography>{user.data.email}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Total companies
                </Typography>
                <Typography>{user.data.totalCompanies}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Total contacts
                </Typography>
                <Typography>{user.data.totalContactPersons}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Total profiles
                </Typography>
                <Typography>{user.data.totalProfiles}</Typography>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:w-320" >
        {!isAdmin && <DeleteAccountTab handleDeleteProfile={handleDeleteProfile} /> }
        </div>
      </div>
    </motion.div>
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full mt-8"
    >
      <div className="md:flex">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32">
            <div className="px-32 pt-24">
              <Typography className="text-2xl font-semibold leading-tight">
                Update Password
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
              <div className="mb-24">
              <UpdatePasswordTab handleUpdateProfile={handleUpdateProfile}/>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:w-320" />
      </div>
    </motion.div>
    </div>
  );
}

export default AboutTab;

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function AboutTab(props) {
  const { user } = props;

  if (!user) {
    return null;
  }

  const fullName = user.data.displayName || "";
  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0] || "N/A";
  const lastName = nameParts.slice(1).join(" ") || "N/A";
  const navigate = useNavigate();


  function handleEditProfile() {
     navigate(`/profile/${user.uuid}`);
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
              <div className="flex justify-between w-full px-24 py-12">
              <div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  First name
                </Typography>
                <Typography>{firstName}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Role
                </Typography>
                <Typography>{user.role}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Company
                </Typography>
                <Typography>{user.data.company || 'N/A'}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Telephone
                </Typography>
                <Typography>{user.data.telephone || 'N/A'}</Typography>
              </div>
              </div>
              <div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Last name
                </Typography>
                <Typography>{lastName}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Email
                </Typography>
                <Typography>{user.data.email}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  CVR
                </Typography>
                <Typography>{user.data.cvr || 'N/A'}</Typography>
              </div>
              </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:w-320" >
        <div className="w-3/4 mb-12">
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          onClick={() => handleEditProfile()}
          startIcon={<FuseSvgIcon size={20}>heroicons-solid:pencil</FuseSvgIcon>}
        >
             Edit
        </Button>
        </div>
        </div>
      </div>
    </motion.div>
    </div>
  );
}

export default AboutTab;

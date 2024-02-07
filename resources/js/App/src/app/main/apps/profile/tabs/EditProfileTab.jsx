import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

function EditProfileTab() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/api/profile/photos-videos").then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) {
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
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <div className="md:flex">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32"></div>
      </div>
    </motion.div>
  );
}

export default EditProfileTab;

import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  selectCompaniesSearchText,
  setCompaniesSearchText,
} from "./store/companiesSlice";

function CompaniesHeader(props) {
  const { isAdmin, toggleProfileDialog } = props;
  const dispatch = useDispatch();
  const searchText = useSelector(selectCompaniesSearchText);

  return (
    <div className="w-full">
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 b px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        Companies
      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Search companies"
            className="flex flex-1"
            disableUnderline
            fullWidth
            value={searchText}
            inputProps={{
              "aria-label": "Search",
            }}
            onChange={(ev) => dispatch(setCompaniesSearchText(ev))}
          />
        </Paper>
        {!isAdmin && 
              <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              >
              <Button
                className="whitespace-nowrap mx-4"
                component={Link}
                to="new"
                variant="contained"
                color="secondary"
                startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
              >
                Add Company
              </Button>
              <Button
                className="whitespace-nowrap mx-4"
                to="new"
                variant="outlined"
                color="secondary"
                onClick={() => toggleProfileDialog()}
                startIcon={<FuseSvgIcon>heroicons-outline:information-circle</FuseSvgIcon>}
              >
                How do I do that?
              </Button>
            </motion.div>
        }
      </div>
    </div>
    </div>
  );
}

export default CompaniesHeader;

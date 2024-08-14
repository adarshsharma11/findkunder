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
  const { isAdmin } = props;
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
        Locations
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
            placeholder="Search locations"
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
                className=""
                component={Link}
                to="new"
                variant="contained"
                color="secondary"
                startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
              >
                Add
              </Button>
            </motion.div>
        }
      </div>
    </div>
    {!isAdmin && (
       <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-16 px-24 md:px-32">
          <motion.div
          className="text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          >
          <Typography variant="body2" color="textSecondary">
            Remember to create at least one contact on the <Link to="/contact-person">My Contacts</Link> page
            and link your contact to one or more of your locations on the <Link to="/profiles">My Profiles</Link> page. 
            Otherwise, we won't be able to connect you with potential customers.
          </Typography>
        </motion.div>
        </div>
      )}
    </div>
  );
}

export default CompaniesHeader;

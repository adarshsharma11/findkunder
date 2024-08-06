import { combineReducers } from "@reduxjs/toolkit";
import lead from "./leadSlice";
import leads from "./leadsSlice";
import leadEmail from "./leadEmailSlice";

const reducer = combineReducers({
  lead,
  leads,
  leadEmail,
});

export default reducer;

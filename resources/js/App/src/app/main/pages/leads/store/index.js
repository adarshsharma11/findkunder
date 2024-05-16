import { combineReducers } from "@reduxjs/toolkit";
import lead from "./leadSlice";
import leads from "./leadsSlice";

const reducer = combineReducers({
  lead,
  leads,
});

export default reducer;

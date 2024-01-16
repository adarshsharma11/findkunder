import { combineReducers } from "@reduxjs/toolkit";
import company from "./companySlice";
import companies from "./companiesSlice";

const reducer = combineReducers({
  companies,
  company,
});

export default reducer;

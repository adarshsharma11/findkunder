import { combineReducers } from "@reduxjs/toolkit";
import userAccount from "./userAccountSlice";
import userAccounts from "./userAccountsSlice";

const reducer = combineReducers({
  userAccount,
  userAccounts,
});

export default reducer;

import { combineReducers } from "@reduxjs/toolkit";
import customer from "./customerSlice";
import customers from "./customersSlice";

const reducer = combineReducers({
  customer,
  customers,
});

export default reducer;

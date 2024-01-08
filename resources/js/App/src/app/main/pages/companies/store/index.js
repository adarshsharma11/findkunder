import { combineReducers } from "@reduxjs/toolkit";
import product from "./companySlice";
import products from "./companiesSlice";

const reducer = combineReducers({
  products,
  product,
});

export default reducer;

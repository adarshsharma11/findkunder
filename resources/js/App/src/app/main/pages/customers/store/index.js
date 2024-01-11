import { combineReducers } from "@reduxjs/toolkit";
import product from "./customerSlice";
import products from "./customersSlice";

const reducer = combineReducers({
  products,
  product,
});

export default reducer;

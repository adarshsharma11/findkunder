import { combineReducers } from "@reduxjs/toolkit";
import product from "./contactPersonSlice";
import products from "./contactPersonsSlice";

const reducer = combineReducers({
  products,
  product,
});

export default reducer;

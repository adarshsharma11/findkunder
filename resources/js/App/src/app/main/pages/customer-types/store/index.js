import { combineReducers } from "@reduxjs/toolkit";
import customerType from "./customerTypeSlice";
import customerTypes from "./customerTypesSlice";

const reducer = combineReducers({
  customerType,
  customerTypes,
});

export default reducer;

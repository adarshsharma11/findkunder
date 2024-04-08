import { combineReducers } from "@reduxjs/toolkit";
import customerLocation from "./customerLocationSlice";
import customerLocations from "./customerLocationsSlice";

const reducer = combineReducers({
  customerLocation,
  customerLocations,
});

export default reducer;

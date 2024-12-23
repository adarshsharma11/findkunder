import { combineReducers } from "@reduxjs/toolkit";
import location from "./locationSlice";
import locations from "./locationsSlice";

const reducer = combineReducers({
  location,
  locations,
});

export default reducer;

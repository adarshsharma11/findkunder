import { combineReducers } from "@reduxjs/toolkit";
import contact from "./contactPersonSlice";
import contacts from "./contactPersonsSlice";

const reducer = combineReducers({
  contacts,
  contact,
});

export default reducer;

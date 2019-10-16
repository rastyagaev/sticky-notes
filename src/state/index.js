import { combineReducers } from "redux";
import { default as boards } from "./boards";
import { default as notes } from "./notes";

export default combineReducers({
  boards,
  notes
});

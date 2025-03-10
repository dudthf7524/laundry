import { combineReducers } from "redux";
import user from "./user";
import auth from "./auth";
import time from "./time";
import process from "./process";
import userProcess from "./userProcess";


const rootReducer = combineReducers({
  user,
  auth,
  time,
  process,
  userProcess,
});

export default rootReducer;
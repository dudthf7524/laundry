import { combineReducers } from "redux";
import user from "./user";
import auth from "./auth";
import time from "./time";
import process from "./process";
import userProcess from "./userProcess";
import task from "./task";
import work from "./work";
import attendanceStart from "./attendanceStart";
import attendanceEnd from "./attendanceEnd";
import vacation from "./vacation";
import companyAddress from "./companyAddress";
import taskStart from "./taskStart";
import taskEnd from "./taskEnd";


const rootReducer = combineReducers({
  user,
  auth,
  time,
  process,
  userProcess,
  task,
  work,
  attendanceStart,
  attendanceEnd,
  vacation,
  companyAddress,
  taskStart,
  taskEnd,
});

export default rootReducer;
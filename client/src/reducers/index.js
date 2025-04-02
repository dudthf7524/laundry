import { combineReducers } from "redux";
import user from "./user";
import auth from "./auth";
import time from "./time";
import process from "./process";
import userProcess from "./userProcess";
import task from "./task";
import attendanceStart from "./attendanceStart";
import attendanceEnd from "./attendanceEnd";
import vacation from "./vacation";
import companyAddress from "./companyAddress";
import taskStart from "./taskStart";
import taskEnd from "./taskEnd";
import chart from "./chart";
import notice from "./notice";
import companyVacation from "./companyVacation";
import logout from "./logout";
import chartLate from "./chartLate";

const rootReducer = combineReducers({
  user,
  auth,
  time,
  process,
  userProcess,
  task,
  attendanceStart,
  attendanceEnd,
  vacation,
  companyAddress,
  taskStart,
  taskEnd,
  chart,
  notice,
  companyVacation,
  logout,
  chartLate,
});

export default rootReducer;
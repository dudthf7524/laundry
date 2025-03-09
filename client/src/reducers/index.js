import { combineReducers } from "redux";
import user from "./user";
import auth from "./auth";
import workType from "./workType";


const rootReducer = combineReducers({
  user,
  auth,
  workType,
});

export default rootReducer;
import { combineReducers } from "redux";
import { userReducer } from "./user";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer
});

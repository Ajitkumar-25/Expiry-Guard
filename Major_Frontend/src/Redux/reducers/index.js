import authReducer from "./auth";
import { apiSlice } from "../../services/common";

const rootReducer = {
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
};
export default rootReducer;

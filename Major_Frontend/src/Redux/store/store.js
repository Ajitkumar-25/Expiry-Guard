import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../../services/common/index";
import rootReducer from "../reducers";

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const AppDispatch = store.dispatch;

export const RootState = store.getState;
export default store;

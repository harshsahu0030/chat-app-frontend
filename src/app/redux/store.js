import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth.reducer";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
  },
});

export default store;

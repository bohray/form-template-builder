import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "./Template/templateSlice";

export const store = configureStore({
  reducer: {
    template: templateReducer,
  },
});

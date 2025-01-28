import { configureStore } from "@reduxjs/toolkit";
import dealReducer from "./slices/dealSlice";

const store = configureStore({
  reducer: {
    deal: dealReducer,
  }
})

export default store
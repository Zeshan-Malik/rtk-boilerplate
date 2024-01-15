import { configureStore } from "@reduxjs/toolkit";
import DashboardReducer from "../Components/Dashboard/dashboardSlice";

const store = configureStore({
  reducer: {
    dashboard: DashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Config/APIConfigs";
import { getResources } from "../../services/axios/ApiMethods";

const initialDashboardState = {
  playerList: [],
};

export const getGraphsData = createAsyncThunk("DashboardIndex", (data) => {
 const response = getResources(API.Products.dashboardCategories)
 return response
});

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  extraReducers: (builder) => {
    builder.addCase(getGraphsData.fulfilled, (state, action) => {
      state.playerList = action.payload;
    });
  },
});
export default DashboardSlice.reducer;

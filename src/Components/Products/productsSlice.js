import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Config/APIConfigs";
import { getResources } from "../../services/axios/ApiMethods";

const initialDashboardState = {
  playerList: [],
};

export const getGraphsData = createAsyncThunk("DashboardIndex", (data) => {
 const response = getResources(API.JSONPLACEHOLDER.todos)
 return response
});

export const getAllProducts = createAsyncThunk("AllProducts", (data) => {
  const response = getResources(API.Products.allProducts)
  return response
 });

 export const createNewProduct = createAsyncThunk("createProduct", (data) => {
  const response = getResources(API.Products.createNewProduct)
  return response
 });
 export const deleteProduct = createAsyncThunk("deleteProduct", (data) => {
  const response = getResources(API.Products.createNewProduct)
  return response
 });
 export const updateProduct = createAsyncThunk("updateProduct", (data) => {
  const response = getResources(API.Products.createNewProduct)
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

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Config/APIConfigs";
import { getResources,postResources } from "../../services/axios/ApiMethods";

const initialDashboardState = {
  playerList: [],
};

export const getGraphsData = createAsyncThunk("DashboardIndex", (data) => {
 const response = getResources(API.JSONPLACEHOLDER.todos)
 return response
});

export const getAllProducts = createAsyncThunk("AllProducts",async (data) => {
  const response = await getResources(API.Products.allProducts)
  return response.data
 });

 export const createNewProduct = createAsyncThunk("createProduct", (data) => {
  const response = postResources(API.Products.createNewProduct,data)
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

 export const getProductById = createAsyncThunk("getProductById", (param) => {
  const response = getResources(API.Products.getProductById+param)
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

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "customer/customerLocation/getCustomerLocation",
  async (productId) => {
    const response = await axios.get(`/api/customerLocations/${productId}`);
    const data = await response.data;
    return data === undefined ? null : data;
  }
);

export const removeProduct = createAsyncThunk(
  "customer/customerLocation/removeCustomerLocation",
  async (id, { dispatch, getState }) => {
    const response = await axios.delete(`/api/customerLocations/${id}`);
    const data = await response.data;
    return data;
  }
);

export const saveProduct = createAsyncThunk(
  "contact/customerLocation/saveLocation",
  async (productData, { dispatch, getState }) => {
    const response = await axios.post(
      `/api/customerLocations/${productData.id}?_method=PUT`,
      productData
    );
    const data = await response.data;
    return data;
  }
);

export const addNewCustomerType = createAsyncThunk(
  "customer/customerLocation/addNewLocation",
  async (personData, { dispatch, getState }) => {
    const response = await axios.post("/api/customerLocations", personData);
    const data = response.data;
    return data;
  }
);

const customerLocationSlice = createSlice({
  name: "customer/customerLocation",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          name: "",
        },
      }),
    },
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [addNewCustomerType.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = customerLocationSlice.actions;

export const selectProduct = ({ customerLocation }) => customerLocation.customerLocation;

export default customerLocationSlice.reducer;

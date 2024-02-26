import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "customer/customerType/getCustomerType",
  async (productId) => {
    const response = await axios.get(`/api/customerTypes/${productId}`);
    const data = await response.data;
    return data === undefined ? null : data;
  }
);

export const removeProduct = createAsyncThunk(
  "customer/customerType/removeCustomerType",
  async (id, { dispatch, getState }) => {
    const response = await axios.delete(`/api/customerTypes/${id}`);
    const data = await response.data;
    return data;
  }
);

export const saveProduct = createAsyncThunk(
  "contact/saveContact",
  async (productData, { dispatch, getState }) => {
    const response = await axios.post(
      `/api/customerTypes/${productData.id}?_method=PUT`,
      productData
    );
    const data = await response.data;
    return data;
  }
);

export const addNewCustomerType = createAsyncThunk(
  "customer/customerType/addNewCategory",
  async (personData, { dispatch, getState }) => {
    const response = await axios.post("/api/customerTypes", personData);
    const data = response.data;
    return data;
  }
);

const customerTypeSlice = createSlice({
  name: "customer/customerType",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          status: "",
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

export const { newProduct, resetProduct } = customerTypeSlice.actions;

export const selectProduct = ({ customerType }) => customerType.customerType;

export default customerTypeSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "admin/account/getUserAccount",
  async (productId) => {
    const response = await axios.get(`/api/accounts/${productId}`);
    const data = await response.data;
    return data === undefined ? null : data;
  }
);

export const removeProduct = createAsyncThunk(
  "admin/account/removeUserAccount",
  async (id, { dispatch, getState }) => {
    const response = await axios.delete(`/api/accounts/${id}`);
    const data = await response.data;
    return data;
  }
);

export const saveProduct = createAsyncThunk(
  "admin/account/saveUserAccount",
  async (productData, { dispatch, getState }) => {
    const response = await axios.post(
      `/api/accounts/${productData.id}?_method=PUT`,
      productData
    );
    const data = await response.data;
    return data;
  }
);

export const addNewCustomerType = createAsyncThunk(
  "admin/account/addNewAccount",
  async (personData, { dispatch, getState }) => {
    const response = await axios.post("/api/accounts", personData);
    const data = response.data;
    return data;
  }
);

const customerTypeSlice = createSlice({
  name: "admin/userAccount",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          email: "",
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

export const selectProduct = ({ userAccount }) => userAccount.userAccount;

export default customerTypeSlice.reducer;

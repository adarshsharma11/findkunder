import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "customer/customerLead/getCustomerLead",
  async (productId) => {
    const response = await axios.get(`/api/leads/${productId}`);
    const data = await response.data;
    return data === undefined ? null : data;
  }
);

export const removeProduct = createAsyncThunk(
  "customer/customerLead/removeCustomerLead",
  async (id, { dispatch, getState }) => {
    const response = await axios.delete(`/api/leads/${id}`);
    const data = await response.data;
    return data;
  }
);

export const saveProduct = createAsyncThunk(
  "contact/customerLead/assignCustomers",
  async (productData, { dispatch, getState }) => {
    const response = await axios.post(
      `/api/lead/assign-profiles`,
      productData
    );
    const data = await response.data;
    return data;
  }
);

export const addNewLead = createAsyncThunk(
  "customer/customerLead/addNewLead",
  async (personData, { dispatch, getState }) => {
    const response = await axios.post("/api/leads", personData);
    const data = response.data;
    return data;
  }
);

const customerLeadSlice = createSlice({
  name: "customer/lead",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          status: "",
        },
      }),
    },
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [addNewLead.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = customerLeadSlice.actions;

export const selectProduct = ({ lead }) => lead.lead;

export default customerLeadSlice.reducer;

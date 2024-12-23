import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "eCommerceApp/customer/getProduct",
  async (productId) => {
    const response = await axios.get(`/api/customers/${productId}`);
    const data = await response.data;
    return data === undefined ? null : data;
  }
);

export const removeProduct = createAsyncThunk(
  "eCommerceApp/customer/removeProduct",
  async ({ id, options }, { dispatch, getState }) => {
    const { deleteCompany, deleteContact } = options;
    await axios.delete(`/api/customers/${id}`, {
      data: {
        deleteProfile: true,
        deleteCompany,
        deleteContact,
      },
    });
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  "eCommerceApp/customer/saveProduct",
  async (productData, { dispatch, getState }) => {
    const response = await axios.put(
      `/api/customers/${productData.id}`,
      productData
    );
    const data = await response.data;
    return data;
  }
);

export const addNewPerson = createAsyncThunk(
  "eCommerceApp/customer/addNewPerson",
  async (personData, { dispatch, getState }) => {
    const response = await axios.post("/api/customers", personData);
    const data = response.data;
    return data;
  }
);

const productSlice = createSlice({
  name: "eCommerceApp/customer",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          person_id: "",
          categories: [],
          customer_types: [],
          customer_locations: [],
          person: {},
          notes: "",
          status: "0",
        },
      }),
    },
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [addNewPerson.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ customer }) => customer.customer;

export default productSlice.reducer;

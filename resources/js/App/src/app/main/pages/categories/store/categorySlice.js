import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "customer/category/getCategory",
  async (productId) => {
    const response = await axios.get(`/api/categories/${productId}`);
    const data = await response.data;
    return data === undefined ? null : data;
  }
);

export const removeProduct = createAsyncThunk(
  "customer/category/removeCategory",
  async (id, { dispatch, getState }) => {
    const response = await axios.delete(`/api/categories/${id}`);
    const data = await response.data;
    return data;
  }
);

export const saveProduct = createAsyncThunk(
  "customer/category/saveCategory",
  async (productData, { dispatch, getState }) => {
    const response = await axios.post(
      `/api/categories/${productData.id}?_method=PUT`,
      productData
    );
    const data = await response.data;
    return data;
  }
);

export const addNewCustomerType = createAsyncThunk(
  "customer/category/addNewCategory",
  async (personData, { dispatch, getState }) => {
    const response = await axios.post("/api/categories", personData);
    const data = response.data;
    return data;
  }
);

const categorySlice = createSlice({
  name: "customer/category",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          parent_id: "",
          name: "",
          subcategories: [],
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

export const { newProduct, resetProduct } = categorySlice.actions;

export const selectProduct = ({ category }) => category.category;

export default categorySlice.reducer;

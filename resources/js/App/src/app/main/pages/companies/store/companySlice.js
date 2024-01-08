import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "eCommerceApp/product/getProduct",
  async (productId) => {
    const response = await axios.get(`/api/companies/${productId}`);
    const data = await response.data;
    return data === undefined ? null : data;
  }
);

export const removeProduct = createAsyncThunk(
  "eCommerceApp/product/removeProduct",
  async (id, { dispatch, getState }) => {
    await axios.delete(`/api/companies/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  "eCommerceApp/product/saveProduct",
  async (productData, { dispatch, getState }) => {
    const response = await axios.put(
      `/api/companies/${productData.id}`,
      productData
    );
    const data = await response.data;
    return data;
  }
);

export const addNewCompany = createAsyncThunk(
  "eCommerceApp/product/addNewCompany",
  async (companyData, { dispatch, getState }) => {
    const response = await axios.post("/api/companies", companyData);
    const data = response.data;
    return data;
  }
);

const productSlice = createSlice({
  name: "eCommerceApp/product",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          company_name: "",
          cvr: "",
          street: "",
          postal_code: "",
          city: "",
          location: "",
          website: "",
          linkedin: "",
          facebook: "",
        },
      }),
    },
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [addNewCompany.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ eCommerceApp }) => eCommerceApp.product;

export default productSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "eCommerceApp/product/getProduct",
  async (productId) => {
    const response = await axios.get(`/api/contact-person/${productId}`);
    const data = await response.data;
    return data === undefined ? null : data;
  }
);

export const removeProduct = createAsyncThunk(
  "eCommerceApp/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp.product;
    await axios.delete(`/api/contact-person/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  "eCommerceApp/product/saveProduct",
  async (productData, { dispatch, getState }) => {
    const response = await axios.put(
      `/api/contact-person/${productData.id}`,
      productData
    );
    const data = await response.data;
    return data;
  }
);

export const addNewPerson = createAsyncThunk(
  "eCommerceApp/product/addNewPerson",
  async (personData, { dispatch, getState }) => {
    const response = await axios.post("/api/contact-person", personData);
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
          company_id: "",
          title: "",
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          linkedin: "",
          comment: "",
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

export const selectProduct = ({ eCommerceApp }) => eCommerceApp.product;

export default productSlice.reducer;

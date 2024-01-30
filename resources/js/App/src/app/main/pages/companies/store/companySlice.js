import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "company/getProduct",
  async (productId) => {
    const response = await axios.get(`/api/companies/${productId}`);
    const data = await response.data;
    return data === undefined ? null : data;
  }
);

export const removeProduct = createAsyncThunk(
  "company/removeProduct",
  async (id, { dispatch, getState }) => {
    const response = await axios.delete(`/api/companies/${id}`);
    const data = await response.data;
    return data;
  }
);

export const saveProduct = createAsyncThunk(
  "company/saveProduct",
  async (productData, { dispatch, getState }) => {
    const formData = new FormData();
    if (productData.image) {
      formData.append("image", productData.image);
    }
    Object.keys(productData).forEach((key) => {
      if (key !== "image" && productData[key] !== null) {
        formData.append(key, productData[key]);
      }
    });
    const response = await axios.post(
      `/api/companies/${productData.id}?_method=PUT`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = await response.data;
    return data;
  }
);

export const addNewCompany = createAsyncThunk(
  "company/addNewCompany",
  async (companyData, { dispatch, getState }) => {
    const formData = new FormData();
    if (companyData.image) {
      formData.append("image", companyData.image);
    }
    Object.keys(companyData).forEach((key) => {
      if (key !== "image") {
        formData.append(key, companyData[key]);
      }
    });
    const response = await axios.post("/api/companies", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = response.data;
    return data;
  }
);

const companySlice = createSlice({
  name: "company/company",
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
          image: "",
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

export const { newProduct, resetProduct } = companySlice.actions;

export const selectProduct = ({ company }) => company.company;

export default companySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "contact/getContact",
  async (productId) => {
    const response = await axios.get(`/api/contact-person/${productId}`);
    const data = await response.data;
    return data === undefined ? null : data;
  }
);

export const removeProduct = createAsyncThunk(
  "contact/removeContact",
  async (val, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp.product;
    await axios.delete(`/api/contact-person/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  "contact/saveContact",
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
  "contact/addNewPerson",
  async (personData, { dispatch, getState }) => {
    const response = await axios.post("/api/contact-person", personData);
    const data = response.data;
    return data;
  }
);

const contactSlice = createSlice({
  name: "contact/contact",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
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

export const { newProduct, resetProduct } = contactSlice.actions;

export const selectProduct = ({ contact }) => contact.contact;

export default contactSlice.reducer;

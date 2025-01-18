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
  async (id, { dispatch, getState }) => {
    const response = await axios.delete(`/api/contact-person/${id}`);
    const data = await response.data;
    return data;
  }
);

export const saveProduct = createAsyncThunk(
  "contact/saveContact",
  async (productData, { dispatch, getState }) => {
    const formData = new FormData();
    console.log(productData, 'productData')
    if (productData.image) {
      formData.append("image", productData.image);
    }
    Object.keys(productData).forEach((key) => {
      if (key === "services" && Array.isArray(productData.services) && productData.services.length > 0) {
        productData.services.forEach((service) => {
          formData.append("services[]", service);
        });
      }
      else if (key === "customer_types" && Array.isArray(productData.customer_types) && productData.customer_types.length > 0) {
        productData.customer_types.forEach((type) => {
          formData.append("customer_types[]", type);
        });
      }
      else if (key !== "image" && productData[key] !== null && productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    });
    const response = await axios.post(
      `/api/contact-person/${productData.id}?_method=PUT`,
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

export const addNewPerson = createAsyncThunk(
  "contact/addNewPerson",
  async (personData, { dispatch, getState }) => {
    const formData = new FormData();
    if (personData.image) {
      formData.append("image", personData.image);
    }
    Object.keys(personData).forEach((key) => {
      if (key === "services" && Array.isArray(personData.services)) {
        personData.services.forEach((service) => {
          formData.append("services[]", service);
        });
      } 
      else if (key === "customer_types" && Array.isArray(personData.customer_types)) {
        personData.customer_types.forEach((type) => {
          formData.append("customer_types[]", type);
        });
      }
      else if (key !== "image" && personData[key] !== null && personData[key] !== undefined) {
        formData.append(key, personData[key]);
      }
    });
    const response = await axios.post("/api/contact-person", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
          image: "",
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

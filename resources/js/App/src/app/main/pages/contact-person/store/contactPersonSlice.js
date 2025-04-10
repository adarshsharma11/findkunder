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
    try {
      const formData = new FormData();  
      // Simplified FormData construction
      Object.keys(productData).forEach((key) => {
        if (key === "image" && productData.image instanceof File) {
          formData.append("image", productData.image);
        }
        else if (key === "services" && Array.isArray(productData.services) && productData.services.length > 0) {
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

      if (!formData.has('location_id') && productData.location_id) {
        formData.append('location_id', productData.location_id);
      }
      
      // Debug log to check form data
      const formEntries = {};
      for (let [key, value] of formData.entries()) {
        formEntries[key] = value;
      }
    
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
    } catch (error) {
      console.error("Error in saveProduct:", error.response?.data || error);
      throw error;
    }
  }
);

export const addNewPerson = createAsyncThunk(
  "contact/addNewPerson",
  async (personData, { dispatch, getState }) => {
    try {
      const formData = new FormData();
      
      console.log('Creating contact person with data:', personData);
      
      // Simplified FormData construction
      Object.keys(personData).forEach((key) => {
        if (key === "image" && personData.image instanceof File) {
          formData.append("image", personData.image);
        }
        else if (key === "services" && Array.isArray(personData.services)) {
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
          // Make sure location_id is properly included
          formData.append(key, personData[key]);
        }
      });
      
      // Double-check to ensure location_id is included
      if (!formData.has('location_id') && personData.location_id) {
        formData.append('location_id', personData.location_id);
      }
      
      // Debug log to check if location_id is in the form data
      const formEntries = {};
      for (let [key, value] of formData.entries()) {
        formEntries[key] = value;
      }
      console.log('Form data being sent to API:', formEntries);
      
      const response = await axios.post("/api/contact-person", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error in addNewPerson:", error.response?.data || error);
      throw error;
    }
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
          location_id: "",  // Add location_id to initial state
          title: "",
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          image: "",
          linkedin: "",
          comment: "",
          services: [],
          customer_types: [],
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

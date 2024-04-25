import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "contact/getContactPersons",
  async (userId) => {
    let url = "/api/contact-person";
    if (userId) {
      url += `?userId=${userId}`;
    }
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  }
);

export const removeProducts = createAsyncThunk(
  "eCommerceApp/contacts",
  async (productIds, { dispatch, getState }) => {
    await axios.delete("/api/ecommerce/products", { data: productIds });
    return productIds;
  }
);

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
  contactsAdapter.getSelectors((state) => state.contact.contacts);

const contactsSlice = createSlice({
  name: "contact/contacts",
  initialState: contactsAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: contactsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      contactsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = contactsSlice.actions;

export const selectProductsSearchText = ({ contact }) =>
  contact.contacts.searchText;

export default contactsSlice.reducer;

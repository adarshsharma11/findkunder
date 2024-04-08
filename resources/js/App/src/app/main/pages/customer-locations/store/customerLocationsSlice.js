import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "customer/customerLocations/getCustomerLocations",
  async () => {
    const response = await axios.get("/api/customerLocations");
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
  contactsAdapter.getSelectors((state) => state.customerLocations.customerLocations);

const customerTypesSlice = createSlice({
  name: "customer/customerTypes",
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

export const { setProductsSearchText } = customerTypesSlice.actions;

export const selectProductsSearchText = ({ customerLocations }) =>
customerLocations.customerLocations.searchText;

export default customerTypesSlice.reducer;

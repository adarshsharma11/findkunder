import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "customer/customerLeads/getCustomerLeads",
  async () => {
    const response = await axios.get("/api/leads");
    const data = await response.data;
    return data;
  }
);

export const getAssignLeadsProfiles = createAsyncThunk(
  "customer/customerLeads/getCustomerAssignLeadsProfiles",
  async (assignLeadsData) => {
    const response = await axios.post("/api/leads/get-profiles", assignLeadsData);
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
  contactsAdapter.getSelectors((state) => state.leads.leads);

const customerLeadsSlice = createSlice({
  name: "customer/leads",
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

export const { setProductsSearchText } = customerLeadsSlice.actions;

export const selectProductsSearchText = ({ leads }) =>
leads.leads.searchText;

export default customerLeadsSlice.reducer;

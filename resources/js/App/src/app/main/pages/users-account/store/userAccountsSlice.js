import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "admin/account/getAccounts",
  async () => {
    const response = await axios.get("/api/accounts");
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

export const getCompanies = createAsyncThunk(
  "admin/userAccounts/getCompanies",
  async (userId) => {
    let url = "/api/companies";
    if (userId) {
      url += `?userId=${userId}`;
    }
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  }
);

export const getLocations = createAsyncThunk(
  "admin/userAccounts/getCompanies",
  async (userId) => {
    let url = "/api/company-locations";
    if (userId) {
      url += `?userId=${userId}`;
    }
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  }
);

export const getPersons = createAsyncThunk(
  "admin/userAccounts/getPersons",
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

export const getProfiles = createAsyncThunk(
  "admin/userAccounts/getProfiles",
  async (userId) => {
    let url = "/api/customers";
    if (userId) {
      url += `?userId=${userId}`;
    }
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  }
);

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
  contactsAdapter.getSelectors((state) => state.userAccounts.userAccounts);

const customerTypesSlice = createSlice({
  name: "admin/userAccounts",
  initialState: contactsAdapter.getInitialState({
    searchText: "",
    locationSearchText: "",
    personSearchText: "",
    profileSearchText: "",
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
    setLocationSearchText: {
      reducer: (state, action) => {
        state.locationSearchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
    setPersonSearchText: {
      reducer: (state, action) => {
        state.personSearchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
    setProfileSearchText: {
      reducer: (state, action) => {
        state.profileSearchText = action.payload;
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

export const { setProductsSearchText, setLocationSearchText, setPersonSearchText, setProfileSearchText } = customerTypesSlice.actions;

export const selectProductsSearchText = ({ userAccounts }) =>
userAccounts.userAccounts.searchText;

export const selectCompaniesSearchText = ({ userAccount }) =>
userAccount.userAccounts.locationSearchText;

export const selectPersonSearchText = ({ userAccount }) =>
userAccount.userAccounts.personSearchText;

export const selectProfileSearchText = ({ userAccount }) =>
userAccount.userAccounts.profileSearchText;

export default customerTypesSlice.reducer;

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getCompanies = createAsyncThunk(
  "company/getCompanies",
  async () => {
    const response = await axios.get("/api/companies");
    const data = await response.data;
    return data;
  }
);

export const removeProducts = createAsyncThunk(
  "company/products",
  async (productIds, { dispatch, getState }) => {
    await axios.delete("/api/ecommerce/products", { data: productIds });

    return productIds;
  }
);

const companiesAdapter = createEntityAdapter({});

export const { selectAll: selectCompanies, selectById: selectCompanyById } =
  companiesAdapter.getSelectors((state) => state.company.companies);

const companiesSlice = createSlice({
  name: "company/companies",
  initialState: companiesAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setCompaniesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getCompanies.fulfilled]: companiesAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      companiesAdapter.removeMany(state, action.payload),
  },
});

export const { setCompaniesSearchText } = companiesSlice.actions;

export const selectCompaniesSearchText = ({ company }) =>
  company.companies.searchText;

export default companiesSlice.reducer;

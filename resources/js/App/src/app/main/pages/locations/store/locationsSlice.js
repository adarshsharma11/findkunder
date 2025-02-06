import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getLocations = createAsyncThunk(
  "locations/getLocations",
  async (params) => {
    let url = "/api/company-locations";
    if (params.userId) {
      url += `?userId=${params.userId}`;
    }
    if (params.companyId) {
      url += `&companyId=${params.companyId}`;
    }
    const response = await axios.get(url);
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

const locationsAdapter = createEntityAdapter({});

export const { selectAll: selectLocations, selectById: selectCompanyById } =
locationsAdapter.getSelectors((state) => state.location.locations);

const locationsSlice = createSlice({
  name: "location/locations",
  initialState: locationsAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setLocationsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getLocations.fulfilled]: locationsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      companiesAdapter.removeMany(state, action.payload),
  },
});

export const { setLocationsSearchText } = locationsSlice.actions;

export const selectLocationsSearchText = ({ location }) =>
  location.locations.searchText;

export default locationsSlice.reducer;

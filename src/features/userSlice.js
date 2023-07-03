import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi from "../services/appApi";

const initialState = null

export const userSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    logout: () => initialState,
  
  
  },
  extraReducers: (builder) => {
    builder.addMatcher(appApi.endpoints.signup.matchFulfilled, (_, { payload }) => payload);
    builder.addMatcher(appApi.endpoints.addFedex.matchFulfilled, (state, { payload }) => {
      state.fedexAccount = payload;
    });
    builder.addMatcher(appApi.endpoints.addPickup.matchFulfilled, (_, { payload }) => payload);
     builder.addMatcher(appApi.endpoints.cancelPickup.matchFulfilled, (_, { payload }) => payload);
    builder.addMatcher(appApi.endpoints.login.matchFulfilled, (_, { payload }) => payload);
    builder.addMatcher(appApi.endpoints.addToCart.matchFulfilled, (_, { payload }) => payload);
    builder.addMatcher(appApi.endpoints.removeFromCart.matchFulfilled, (_, { payload }) => payload);
    builder.addMatcher(appApi.endpoints.increaseCartProduct.matchFulfilled, (_, { payload }) => payload);
    builder.addMatcher(appApi.endpoints.decreaseCartProduct.matchFulfilled, (_, { payload }) => payload);
    builder.addMatcher(appApi.endpoints.createOrder.matchFulfilled, (_, { payload }) => payload);
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut, selectCurrentToken } from '../features/authSlice';

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token');
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const token = selectCurrentToken(api.getState());
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, token }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://pizzaserver.onrender.com',
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth.token
    if (token) {

      headers.set("authorization", `Bearer ${token}`);
    }
    if (!token) {
   
      headers.set("authorization", `Bearer 555`);
    }
    return headers;
  }
});


export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/user/signup",
        method: "POST",
        body: user,
        meta: { excludeAuthorization: true }, // Exclude authorization for this endpoint
      }),
    }),

    login: builder.mutation({
      query: (user) => ({
        url: "/user/login",
        method: "POST",
        body: user,
        meta: { excludeAuthorization: true }, // Exclude authorization for this endpoint
      }),
    }),

    highlight: builder.mutation({
      query: (body) => ({
        url: "/orders/highlight",
        method: "POST",
        body,
      }),
    }),

    setNewOrderFalse: builder.mutation({
      query: (body) => ({
        url: `/user/updateOrder`,
        method: "PATCH",
        body,
      }),
    }),

    findNewOrder: builder.mutation({
      query: (user) => ({
        url: "/user/orderStatus",
        method: "POST",
        body: user,
      }),
    }),
    addPickup: builder.mutation({
      query: credentials => ({
        url: "/orders/store-pickups",
        method: "POST",
        body: {...credentials},
      }),
    }),
    cancelPickup: builder.mutation({
      query: (body) => ({
        url: "/orders/cancel-pickups",
        method: "POST",
        body,
      }),
    }),

    getDealer: builder.mutation({
      query: (user) => ({
        url: "/all",
        method: "GET",
        body: user,
        meta: { excludeAuthorization: true }, // Exclude authorization for this endpoint
      }),
    }),

    getListings: builder.mutation({
      query: (payload) => ({
        url: "/cars/listings",
        method: "GET",
        body: payload,
        meta: { excludeAuthorization: true }, // Exclude authorization for this endpoint
      }),
    }),

    // creating product
    createProduct: builder.mutation({
      query: (Car) => ({
        url: "/cars/",
        body: Car,
        method: "POST",
      }),
    }),

    deleteProduct: builder.mutation({
      query: ({ product_id, user_id }) => ({
        url: `/cars/${product_id}`,
        body: {
          user_id,
        },
        method: "DELETE",
      }),
    }),

    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/cars/${product.id}`,
        body: product,
        method: "PATCH",
      }),
    }),
    addAddress: builder.mutation({
      query: (body) => ({
        url: "/user/address/",
        body,
        method: "POST",
      }),
    }),
    // add to cart
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/cars/add-to-cart",
        body: cartInfo,
        method: "POST",
      }),
    }),

    addFedex: builder.mutation({
        query: (body) => ({
          url: "/user/add-fedex",
          body,
          method: "POST",
        }),
      }),
    // remove from cart
    removeFromCart: builder.mutation({
      query: (body) => ({
        url: "/cars/remove-from-cart",
        body,
        method: "POST",
      }),
    }),

    // increase cart
    increaseCartProduct: builder.mutation({
      query: (body) => ({
        url: "/cars/increase-cart",
        body,
        method: "POST",
      }),
    }),

    // decrease cart
    decreaseCartProduct: builder.mutation({
      query: (body) => ({
        url: "/cars/decrease-cart",
        body
,
                method: "POST",
            }),
        }),
        // create order
        createOrder: builder.mutation({
            query: (body) => ({
                url: "/orders",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
  useAddAddressMutation,
  useAddPickupMutation,
  useCancelPickupMutation,
    useSetNewOrderFalseMutation,
    useFindNewOrderMutation,
    useAddFedexMutation,
    useHighlightMutation,
    useSignupMutation,
    useLoginMutation,
    useGetDealerMutation,
    useCreateProductMutation,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useIncreaseCartProductMutation,
    useDecreaseCartProductMutation,
    useCreateOrderMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetListingsMutation,
} = appApi;

export default appApi;
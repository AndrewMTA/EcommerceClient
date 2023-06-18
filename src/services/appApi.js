import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create the api

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://pizzaserver.onrender.com" }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "/user/signup",
                method: "POST",
                body: user,
            }),
        }),

        login: builder.mutation({
            query: (user) => ({
                url: "/user/login",
                method: "POST",
                body: user,
            }),
        }),

        highlight: builder.mutation({
            query: (body) => ({
                url: "/orders/highlight",
                method: "POST",
                body
            }),
        }),

        setNewOrderFalse: builder.mutation({
            query: (body) => ({
                url: `/user/updateOrder`,
                method: "PATCH",
                body
            }),
        }),
          
        findNewOrder: builder.mutation({
            query: (user) => ({
                url: "/user/orderStatus",
                method: "POST",
                body: user,
            }),
        }),
        getDealer: builder.mutation({
            query: (user) => ({
                url: "/all",
                method: "GET",
                body: user,
            }),
        }),

        getListings: builder.mutation({
            query: (payload) => ({
              url: "/cars/listings",
              method: "GET",
              body: payload,
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

        // add to cart
        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/cars/add-to-cart",
                body: cartInfo,
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
                body,
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
    useSetNewOrderFalseMutation,
    useFindNewOrderMutation,
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
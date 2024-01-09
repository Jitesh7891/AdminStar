import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
    reducerPath: "adminApi",
    tagTypes: [
        "User",
        "Products",
          "Customers",
          "Transactions",
          "Geography",
          "Sales",
          "Admins",
          "Performance",
          "Dashboard",
    ],

    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query: () => `client/products`,
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => `client/customers`,
            providesTags: ["Customers"],
        }),
        getTransactions:build.query({
            query:({page , pageSize , sort , search })=>({
                url:"client/transactions",
                method:"GET",
                params:{page , pageSize , sort , search}
            }),
            provideTags:["Transactions"]
        }),
        getGeography: build.query({
            query: () => `client/geography`,
            providesTags: ["Geography"],
        }),
        getSales: build.query({
            query: () => `sales/overallstats`,
            providesTags: ["Sales"],
        }),
        getAdmins: build.query({
            query: () => `management/admins`,
            providesTags: ["Sales"],
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"],
        }),
        GetDashboard: build.query({
            query: () => `general/dashboard`,
            providesTags: ["Dashboard"],
        }),
    })
})


export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery,
} = api;
import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/admin";

const AdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    listAllUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}/listAllUsers`,
        method: "GET",
      }),
    }),

    
  }),
});

export const {
  useLoginAdminMutation,

  
} = AdminApiSlice;

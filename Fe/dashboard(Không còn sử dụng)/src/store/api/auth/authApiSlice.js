import {apiSlice} from "../apiSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "identity/auth/token",
                method: "POST",
                body: data,
            }),
        }),
        introspect: builder.mutation({
            query: (token) => ({
                url: "identity/auth/introspect",
                method: "POST",
                body: token,
            }),
        }),
    }),
});
export const {
    useLoginMutation,
    useIntrospectMutation,
} = authApi;

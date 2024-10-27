import {apiSlice} from "../apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        listUser: builder.mutation({
            query: (token) => ({
                url: "identity/users/list-user",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        userInfo: builder.mutation({
            query: (data) => ({
                url: `identity/users/${data.email}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            }),
        }),
        disableUser: builder.mutation({
            query: (data) => {
                console.log("hi")
                return ({
                        url: `identity/users/${data.email}`,
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${data.token}`,
                        },
                    }
                )
            },
        }),
        enableUser: builder.mutation({
            query: (data) => ({
                url: `identity/users/${data.email}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            }),
        }),
    }),
});
export const {
    useListUserMutation,
    useUserInfoMutation,
    useDisableUserMutation,
    useEnableUserMutation
} = userApi;

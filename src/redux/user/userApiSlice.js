import { authApiSlice } from "../api/apiSlice";

export const userAuthApiSlice = authApiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                data: { ...credentials }
            })
        }),
        invalidatesTags: [{ type: 'User', id: 1 }]
    })
})

export const {
    useLoginMutation
} = userAuthApiSlice
import {
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
    // baseUrl for api
    baseUrl: 'https://kayode/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, api) => {
        const state = api.getState()
        const { token } = state.auth
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithReauth = async (
    args,
    api,
    extraOptions
    )=> {
    let result = await baseQuery(args, api, extraOptions)
    // Refresh token here
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ['Categories', 'Articles']
})

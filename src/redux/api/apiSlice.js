import {
    createApi,
} from '@reduxjs/toolkit/query/react'
import axios from 'axios'


const axiosBaseQuery = () =>
    async ({ url, method, data }) => {
        try {
            const result = await axios({
                baseURL: 'https://sv-kb.herokuapp.com/api/v1/',
                url,
                method,
                data,
                withCredentials: true
            })
            return { data: result.data }
        } catch (axiosError) {
            let err = axiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }

export const apiSlice = createApi({
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
    tagTypes: ['Category', 'Article']
})

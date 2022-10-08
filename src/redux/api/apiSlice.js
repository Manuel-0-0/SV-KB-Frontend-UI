import {
    createApi,
} from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { store } from '../store'


const axiosBaseQuery = () =>
    async ({ url, method, data }) => {
        try {
            let axiosOptions = {
                url,
                method,
                data,
            }
            const state = store.getState()
            const { token } = state.user
            if (token) {
                axiosOptions.headers = {
                    authorization: `Bearer ${token}`
                }
            }
            const result = await axios({
                baseURL: 'https://sv-kb.herokuapp.com/api/v1/',
                ...axiosOptions
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
    tagTypes: ['Categories', 'Articles']
})

import {
    createApi,
} from '@reduxjs/toolkit/query/react'
import Axios from 'axios'
import { store } from '../store'

const axiosInstance = Axios.create({
    baseURL: 'https://sv-kb.herokuapp.com/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
})


const axiosBaseQuery = () =>
    async ({ url, method, data }) => {
        try {
            const state = store.getState()
            const { token } = state.user
            if (token) {
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
            }
            const result = await axiosInstance({ method, url, data })
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

const authAxiosBaseQuery = () =>
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
            const result = await Axios({
                baseURL: 'https://sv-kb.herokuapp.com/',
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
    reducerPath: 'baseApi',
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
    tagTypes: ['Categories', 'Articles']
})

export const authApiSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: authAxiosBaseQuery(),
    endpoints: () => ({}),
    tagTypes: ['Users']
})

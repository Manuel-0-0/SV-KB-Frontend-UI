import {
    configureStore,
    combineReducers,
} from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import toastReducer from './toast/toast'

export const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    toast: toastReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

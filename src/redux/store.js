import {
    configureStore,
    combineReducers,
} from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import toastReducer from './toast/toastSlice'
import userReducer from './user/userSlice'

export const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    toast: toastReducer,
    user: userReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

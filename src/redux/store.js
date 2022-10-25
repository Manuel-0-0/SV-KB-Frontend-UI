import {
    configureStore,
    combineReducers,
} from '@reduxjs/toolkit'
import { apiSlice, authApiSlice } from './api/apiSlice'
import toastReducer from './toast/toastSlice'
import userReducer from './user/userSlice'
import sideBarReducer from './sideBar/sideBarSlice'

export const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    toast: toastReducer,
    user: userReducer,
    sideBar: sideBarReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

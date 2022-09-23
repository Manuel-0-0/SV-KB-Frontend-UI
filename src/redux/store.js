import {
    configureStore,
    combineReducers,
} from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import categoryReducer from './category/categorySlice'
import articleReducer from './article/articleSlice'

export const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    category: categoryReducer,
    article: articleReducer
})

export const store = (preloadedState) =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
        preloadedState,
        devTools: process.env.NODE_ENV !== 'production',
    })

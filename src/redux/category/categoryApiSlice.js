import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'

const cartegoryAdapter = createEntityAdapter()

const initialState = cartegoryAdapter.getInitialState({})

export const categoryApiSplice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => ({
                url: '/category/AllCategories',
                method: 'GET',
            }),
            transformResponse: responseData => cartegoryAdapter.setAll(initialState, responseData),
            providesTags: (result, _error, _arg) => [
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Category', id })),
                        { type: 'Category', id: 'LIST' },
                    ]
                    : [{ type: 'Category', id: 'LIST' }],
            ]
        }),
        getCategory: builder.query({
            query: ({ id }) => ({
                url: `/category/${id}`,
                method: 'GET',
            }),
            providesTags: (_result, _error, id) => [{ type: 'Category', id }],
        }),
        createCategory: builder.mutation({
            query: (body) => ({
                url: '/category',
                method: 'POST',
                data: { ...body },
            }),
            invalidatesTags: [{ type: 'Category', id: 'LIST' }],
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/category/${id}`,
                method: 'PATCH',
                data: { ...body },
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Category', id: arg.id }],
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `/category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Category', id: arg.id }]
        }),
    }),
})

export const { useGetCategoriesQuery, useGetCategoryQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = categoryApiSplice

export const selectCategoryResult = categoryApiSplice.endpoints.getCategories.select()

const selectCatgeoryData = createSelector(
    selectCategoryResult,
    categoryResult => categoryResult.data
)

export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds
} = cartegoryAdapter.getSelectors(state => selectCatgeoryData(state) ?? initialState)

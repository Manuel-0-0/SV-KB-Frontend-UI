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
            providesTags: (result, _error, _arg) =>
                result ?
                    [
                        { type: 'Categories', id: "LIST" },
                        ...result?.ids?.map(({ id }) => ({ type: 'Categories', id })),
                    ] : [{ type: 'Categories', id: "LIST" }]

        }),
        getCategory: builder.query({
            query: ({ id }) => ({
                url: `/category/${id}`,
                method: 'GET',
            }),
            providesTags: (_result, _error, id) => [{ type: 'Categories', id }],
        }),
        createCategory: builder.mutation({
            query: (body) => ({
                url: '/category/create',
                method: 'POST',
                data: { ...body },
            }),
            invalidatesTags: [{ type: 'Categories', id: "LIST" }],
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/category/${id}`,
                method: 'PATCH',
                data: { ...body },
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Categories', id: arg.id }],
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `/category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Categories', id: arg.id }]
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
    selectIds: selectCategoryIds,
} = cartegoryAdapter.getSelectors(state => selectCatgeoryData(state) ?? initialState)

import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'

const categoryAdapter = createEntityAdapter()

const initialState = categoryAdapter.getInitialState({})

export const categoryApiSplice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => ({
                url: '/category/AllCategories',
                method: 'GET',
            }),
            transformResponse: responseData => categoryAdapter.setAll(initialState, responseData),
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
            invalidatesTags: [{ type: 'Categories', id: "LIST" }],
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `/category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Categories', id: "LIST" }]
        }),
    }),
})

export const { useGetCategoriesQuery, useGetCategoryQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = categoryApiSplice

export const selectCategoryResult = categoryApiSplice.endpoints.getCategories.select()

const selectCategoryData = createSelector(
    selectCategoryResult,
    categoryResult => categoryResult.data
)


export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds,
    selectTotal: selectCategoryTotal,
} = categoryAdapter.getSelectors(state => selectCategoryData(state) ?? initialState)

import { apiSlice } from '../api/apiSlice'

export const userApiSplice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: '/category',
                method: 'GET',
            }),
            providesTags: ['Categories']
        }),
        getCategory: builder.query({
            query: ({ id }) => ({
                url: `/category/${id}`,
                method: 'GET',
            }),
        }),
        createCategory: builder.mutation({
            query: (body) => ({
                url: '/category',
                method: 'POST',
                body: { ...body },
            }),
            invalidatesTags: ['Categories']
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/category/${id}`,
                method: 'PATCH',
                body: { ...body },
            }),
            invalidatesTags: ['Categories']
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `/category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories']
        }),
    }),
})

export const { useGetCategoriesQuery, useGetCategoryQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = userApiSplice

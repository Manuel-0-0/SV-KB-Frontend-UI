import { apiSlice } from '../api/apiSlice'

export const userApiSplice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: () => ({
                url: '/articles',
                method: 'GET',
            }),
            providesTags: ['Articles']
        }),
        getArticle: builder.query({
            query: ({ id }) => ({
                url: `/article/${id}`,
                method: 'GET',
            }),
        }),
        createArticle: builder.mutation({
            query: (body) => ({
                url: '/article',
                method: 'POST',
                body: { ...body },
            }),
            invalidatesTags: ['Articles']
        }),
        updateArticle: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/article/${id}`,
                method: 'PATCH',
                body: { ...body },
            }),
            invalidatesTags: ['Articles']
        }),
        deleteArticle: builder.mutation({
            query: ({ id }) => ({
                url: `/article/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Articles']
        }),
    }),
})

export const { useGetArticlesQuery, useGetArticleQuery, useCreateArticleMutation, useDeleteArticleMutation, useUpdateArticleMutation } = userApiSplice

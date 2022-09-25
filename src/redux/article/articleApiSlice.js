import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'

const articleAdapter = createEntityAdapter()

const initialState = articleAdapter.getInitialState({})

export const articleApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getArticles: builder.query({
            query: () => ({
                url: '/articles/All',
                method: 'GET',
            }),
            transformResponse: responseData => articleAdapter.setAll(initialState, responseData),
            providesTags: (result, _error, _arg) => [
                { type: 'Articles', id: "LIST" },
                ...result?.ids?.map(({ id }) => ({ type: 'Articles', id })),
            ]

        }),
        getArticle: builder.query({
            query: ({ id }) => ({
                url: `/article/${id}`,
                method: 'GET',
            }),
            providesTags: (_result, _error, id) => [{ type: 'Articles', id }],
        }),
        getArticlesInCategory: builder.query({
            query: ({ id }) => ({
                url: `/articles?CategoryId=${id}`,
                method: 'GET',
            }),
            providesTags: (_result, _error, id) => [{ type: 'Articles', id }],
        }),
        createArticle: builder.mutation({
            query: (body) => ({
                url: '/articles/NewArticle',
                method: 'POST',
                data: { ...body },
            }),
            invalidatesTags: [{ type: 'Articles', id: "LIST" }],
        }),
        updateArticle: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/article/${id}`,
                method: 'PATCH',
                data: { ...body },
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Articles', id: arg.id }],
        }),
        deleteArticle: builder.mutation({
            query: ({ id }) => ({
                url: `/article/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Articles', id: arg.id }]
        }),
    }),
})

export const { useGetArticlesQuery, useGetArticleQuery, useGetArticlesInCategoryQuery, useCreateArticleMutation, useDeleteArticleMutation, useUpdateArticleMutation } = articleApiSlice

export const selectArticleResult = articleApiSlice.endpoints.getArticles.select()

const selectArticleData = createSelector(
    selectArticleResult,
    articleResult => articleResult.data
)

export const {
    selectAll: selectAllArticles,
    selectById: selectArticleById,
    selectIds: selectArticleIds
} = articleAdapter.getSelectors(state => selectArticleData(state) ?? initialState)

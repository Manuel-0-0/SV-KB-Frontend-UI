import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'

const articleAdapter = createEntityAdapter({})

const initialState = articleAdapter.getInitialState()

export const articleApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getArticles: builder.query({
            query: () => ({
                url: '/articles',
                method: 'GET',
            }),
            transformResponse: responseData => articleAdapter.setAll(initialState, responseData),
            providesTags: (result, _error, _arg) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'Article', id })),
                    { type: 'Article', id: 'LIST' },
                ]
                : [{ type: 'Article', id: 'LIST' }],

        }),
        getArticle: builder.query({
            query: ({ id }) => ({
                url: `/article/${id}`,
                method: 'GET',
            }),
        }),
        getArticlesInCategory: builder.query({
            query: ({ id }) => ({
                url: `/article/category/${id}`,
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

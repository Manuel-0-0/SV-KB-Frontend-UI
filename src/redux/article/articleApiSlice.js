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
            providesTags: (result, _error, _arg) =>
                result ?
                    [
                        { type: 'Articles', id: "LIST" },
                        ...result?.ids?.map(({ id }) => ({ type: 'Articles', id })),
                    ] : [{ type: 'Articles', id: "LIST" }]

        }),
        getArticle: builder.query({
            query: ({ id }) => ({
                url: `/articles/${id}`,
                method: 'GET',
            }),
            providesTags: (_result, _error, id) => [{ type: 'Articles', id }],
        }),
        searchArticles: builder.query({
            query: ({ word }) => ({
                url: `/articles/Search?keyword=${word}`,
                method: 'GET',
            }),
            providesTags: (_result, _error, id) => [{ type: 'Articles', id: "LIST" }],
        }),
        getArticlesInCategory: builder.query({
            query: ({ id }) => ({
                url: `/articles/?CategoryId=${id}`,
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
                url: `/articles/Update/${id}`,
                method: 'PUT',
                data: { ...body },
            }),
            invalidatesTags: [{ type: 'Articles', id: "LIST" }],
        }),
        deleteArticle: builder.mutation({
            query: article => ({
                url: `/articles/Delete/${article.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Articles', id: "LIST" }]
        }),
    }),
})

export const { useGetArticlesQuery, useGetArticleQuery, useGetArticlesInCategoryQuery, useSearchArticlesQuery, useCreateArticleMutation, useDeleteArticleMutation, useUpdateArticleMutation } = articleApiSlice

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

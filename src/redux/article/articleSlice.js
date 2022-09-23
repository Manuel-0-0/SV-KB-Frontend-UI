import { createSlice, nanoid } from "@reduxjs/toolkit";

const intialState = []

const articleSlice = createSlice({
    name: 'articles',
    intialState,
    reducers: {
        addArticle : {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(){
                return {
                    payload: {
                        id: nanoid
                    }
                }
            }
        }
    }
})

export const selectAllArticles = (state) => state.articles

export const { addCategory } = articleSlice.actions

export default articleSlice.reducer
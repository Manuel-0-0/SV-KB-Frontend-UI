import { createSlice, nanoid,  } from "@reduxjs/toolkit";

const intialState = []

const categorySlice = createSlice({
    name: 'categories',
    intialState,
    reducers: {
        addCategory : {
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

export const selectAllCategories = (state) => state.categories

export const { addCategory } = categorySlice.actions

export default categorySlice.reducer
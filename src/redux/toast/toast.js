import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: "",
    messageType: ""
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToast: (state, action) => {
            state.message = action.payload.message
            state.messageType = action.payload.messageType
        },
        removeToast: (state) => {
            state.message = ''
            state.messageType = ''
        },

    },
})

export const { addToast, removeToast } = toastSlice.actions

export default toastSlice.reducer
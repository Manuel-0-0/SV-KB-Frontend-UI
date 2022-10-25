import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
}

export const sideBarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        openSideBar: (state) => {
            state.open = true
        },
        closeSideBar: (state) => {
            state.open = false
        },

    },
})

export const { openSideBar, closeSideBar } = sideBarSlice.actions

export default sideBarSlice.reducer
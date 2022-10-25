import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

const initialState = { user: null, token: null }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logOut: (state, _action) => {
            state.user = null
            state.token = null
            Cookies.remove('sv_user')
            Cookies.remove('sv_access')
        }
    },
})

export const { setCredentials, logOut } = userSlice.actions

export default userSlice.reducer

export const selectCurrentUser = (state) => state.user.user
export const selectCurrentToken = (state) => state.user.token
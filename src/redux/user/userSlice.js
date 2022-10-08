import { createSlice } from "@reduxjs/toolkit"

const initialState = { user: null, token: null }

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.token = accessToken
        },
        logOut: (state, _action) => {
            state.user = null
            state.token = null
        }
    },
})

export const { setCredentials, logOut } = userSlice.actions

export default userSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
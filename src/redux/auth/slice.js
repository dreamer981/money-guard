import { createSlice } from "@reduxjs/toolkit";
import { login, refresh, register, signout } from "./operations";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: { username: null, email: null, password: null },
        token: null,
        isLoggedIn: false,
        isRefreshing: false,
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user,
                state.token = action.payload.token,
                state.isLoggedIn = true
        })

            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user,
                    state.token = action.payload.token,
                    state.isLoggedIn = true
            })


            .addCase(signout.fulfilled, (state) => {
                state.user = { username: null, email: null },
                    state.token = null,
                    state.isLoggedIn = false
            })


            .addCase(refresh.pending, (state) => {
                state.isRefreshing = true
            })

            .addCase(refresh.fulfilled, (state, action) => {
                state.user = action.payload.user,
                    state.token = action.payload.token,
                    state.isLoggedIn = true,
                    state.isRefreshing = false
            })

    }
})



export default authSlice.reducer
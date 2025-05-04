import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = ""
}


axios.defaults.baseURL = "https://wallet.b.goit.study/api"
// https://wallet.b.goit.study/api/auth/sign-up

export const register = createAsyncThunk("auth/sign-up", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("/auth/sign-up", userData)
        if (response.data.token) {
            setAuthHeader(response.data.token)
            console.log(response.data.token)
        } else {
            return thunkAPI.rejectWithValue("Token bulunamadı")
        }
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})

export const login= createAsyncThunk("auth/sign-in",async(userData,thunkAPI)=>{
    try{
        const response = await axios.post("/auth/sign-in",userData)
        setAuthHeader(response.data.token)
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err.message)
    }
})

export const signout = createAsyncThunk("auth/sign-out",async(_,thunkAPI)=>{
    try{
        await axios.delete("/auth/log-out")
        clearAuthHeader()
    }catch(err){
        return thunkAPI.rejectWithValue(err.message)
    }
})

export const refresh = createAsyncThunk("users/current",async(_,thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth.token
    if(!token) return thunkAPI.rejectWithValue("Token bulunamadı!")
        setAuthHeader(token)

    try{
        const response = await axios.get("/users/current")
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err.message)
    }
})
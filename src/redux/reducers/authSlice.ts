import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-store";
import { IRegisterForm } from "../../components/Registration";
import { authApi } from "../../api/auth-api";
import { ILoginForm } from "../../components/Login";


export const registration = createAsyncThunk<void, IRegisterForm>
("auth/registration",
    async function (data, { dispatch }) {
        try {
            const response = await authApi.register(data)

        } catch (e) {
            console.log(e)
        }

    });

export const login = createAsyncThunk<void, ILoginForm>
("auth/login",
    async function (data, { dispatch }) {
        try {
            const response = await authApi.login(data)
            localStorage.setItem('token', response.user_jwt)
            dispatch(getMe(response.user_jwt))
            dispatch(loginSuccess())
        } catch (e) {
            console.log(e)
        }
    });

export const logout = createAsyncThunk<void, string>
("auth/login",
    async function (data, { dispatch }) {
        try {
            await authApi.logout(12)
            localStorage.removeItem('token')
            dispatch(logOutSuccess())
        } catch (e) {
            console.log(e)
        }
    });

export const getMe = createAsyncThunk<void, string>
("auth/login",
    async function (token, { dispatch }) {
        try {
            const response = await authApi.getMe(token)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    });

export const checkAuth = createAsyncThunk<void, ILoginForm>
("auth/login",
    async function (data, { dispatch }) {
        dispatch(setLoading(true))
        try {
            await authApi.logout(12)
            localStorage.removeItem('token')
            dispatch(logOutSuccess())
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setLoading(false))
        }
    });

let initialState = {
    isAuth: false,
    isLoading: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isAuth = true
        },
        logOutSuccess: (state) => {
            localStorage.removeItem('token')
            state.isAuth = false
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
    },
});

export const { loginSuccess, logOutSuccess, setLoading } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
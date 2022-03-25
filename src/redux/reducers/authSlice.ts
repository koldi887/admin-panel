import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-store";
import { authApi } from "../../api/auth-api";
import { ILoginForm } from "../../components/LoginForm";
import { IUser } from "../../interfaces/IUser";
import { setUserCreateError } from "./usersSlice";


export const login = createAsyncThunk<void, ILoginForm>
("auth/login",
    async function (data, { dispatch }) {
        try {
            const response = await authApi.login(data)
            localStorage.setItem('token', response.user_jwt)
            dispatch(getMe())
            dispatch(loginSuccess())
            dispatch(setAuthError(''))
        } catch (e: any) {
            dispatch(setAuthError(e.response.data.error))
        }
    });

export const getMe = createAsyncThunk<void, void>
("auth/getMe",
    async function (_, { dispatch }) {
        try {
            const response = await authApi.getMe()
            dispatch(setAuthUser(response))
            dispatch(setUserCreateError(''))
        } catch (e: any) {
            console.log(e.response.data.error)
        }
    });

let initialState = {
    initialize: false,
    isAuth: false,
    authUser: null as null | IUser,
    error: ''
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setInitialize: (state) => {
            if (localStorage.getItem('token')) {
                state.isAuth = true
                state.initialize = true
            } else state.initialize = true
        },
        loginSuccess: (state) => {
            state.isAuth = true
            state.error = ''
        },
        logOutSuccess: (state) => {
            localStorage.removeItem('token')
            state.isAuth = false
            state.error = ''
        },
        setAuthUser: (state, action: PayloadAction<IUser>) => {
            state.authUser = action.payload
        },
        setAuthError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
    },
});

export const {
    loginSuccess,
    logOutSuccess,
    setAuthUser,
    setInitialize,
    setAuthError
} = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
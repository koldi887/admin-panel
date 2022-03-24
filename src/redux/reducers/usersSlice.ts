import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-store";
import { IRegisterForm, IUser } from "../../interfaces/IUser";
import { usersApi } from "../../api/users-api";

export const getUsers = createAsyncThunk<void, void>
("users/getUsers",
    async function (_, { dispatch }) {
        dispatch(setFetching(true))
        try {
            const response = await usersApi.requestUsers()
            dispatch(setUsers(response))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setFetching(false))
        }
    });

export const deleteUser = createAsyncThunk<void, number>
("users/deleteUser",
    async function (userId, { dispatch }) {
        try {
            const response = await usersApi.deleteUser(userId)
            dispatch(deleteSuccess(response.id))
        } catch (e) {
            console.log(e)
        }
    });

export const editUser = createAsyncThunk<void, { id: number, data: IRegisterForm }>
("users/editUser",
    async function ({ id, data }, { dispatch }) {
        try {
            await usersApi.updateUser(id, data)
            dispatch(getUsers())
            dispatch(setError(''))
        } catch (e: any) {
            dispatch(setError(e.response.data.error))
        }
    });

export const createUser = createAsyncThunk<boolean | void, IRegisterForm>
("users/createUser",
    async function (data, { dispatch }) {
        console.log('sees')
        try {
            await usersApi.createUser(data)
            dispatch(getUsers())
            dispatch(setError(''))
            return true
        } catch (e: any) {
            dispatch(setError(e.response.data.error))
        }
    });

let initialState = {
    isFetching: false,
    usersList: [] as IUser[],
    error: ''
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.usersList = action.payload
        },
        deleteSuccess: (state, action: PayloadAction<number>) => {
            const deletedUserId = action.payload
            state.usersList = state.usersList.filter((user) => user.id !== deletedUserId)
        },
        setFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
    },
});

export const { setUsers, deleteSuccess, setFetching, setError } = usersSlice.actions;
export const usersSelector = (state: RootState) => state.users;
export default usersSlice.reducer;
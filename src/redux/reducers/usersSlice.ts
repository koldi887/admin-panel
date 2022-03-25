import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-store";
import { IRegisterForm, IUser } from "../../interfaces/IUser";
import { usersApi } from "../../api/users-api";
import { IEditError } from "../../interfaces/IStationState";

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
            dispatch(removeEditError(id))
        } catch (e: any) {
            dispatch(setUserEditError({ id: id, error: e.response.data.error }))
        }
    });

export const createUser = createAsyncThunk<boolean | void, IRegisterForm>
("users/createUser",
    async function (data, { dispatch }) {
        try {
            await usersApi.createUser(data)
            dispatch(getUsers())
            dispatch(setUserCreateError(''))
            return true
        } catch (e: any) {
            dispatch(setUserCreateError(e.response.data.error))
        }
    });

let initialState = {
    isFetching: false,
    usersList: [] as IUser[],
    editError: [] as IEditError[],
    createError: '',
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
        setUserEditError: (state, action: PayloadAction<IEditError>) => {
            state.editError.push(action.payload)
        },
        setUserCreateError: (state, action: PayloadAction<string>) => {
            state.createError = action.payload
        },
        removeEditError: (state, action: PayloadAction<number>) => {
            state.editError = state.editError.filter(err => err.id !== action.payload)
        },
    },
});

export const {
    setUsers,
    deleteSuccess,
    setFetching,
    setUserEditError,
    setUserCreateError,
    removeEditError
} = usersSlice.actions;
export const usersSelector = (state: RootState) => state.users;
export default usersSlice.reducer;
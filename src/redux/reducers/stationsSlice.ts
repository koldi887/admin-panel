import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-store";
import { IRegisterForm } from "../../interfaces/IUser";
import { stationsApi } from "../../api/stations-api";
import { IStation } from "../../interfaces/IStation";
import { IEditError, IStationState } from "../../interfaces/IStationState";

export const getStations = createAsyncThunk<void, void>
("stations/getStations",
    async function (_, { dispatch }) {
        dispatch(setFetching(true))
        try {
            const response = await stationsApi.requestStations()
            dispatch(setStations(response))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setFetching(false))
        }
    });

export const deleteStation = createAsyncThunk<void, number>
("stations/deleteStation",
    async function (userId, { dispatch }) {
        try {
            const response = await stationsApi.deleteStation(userId)
            dispatch(deleteSuccess(response.id))
        } catch (e) {
            console.log(e)
        }
    });

export const editStation = createAsyncThunk<void, { id: number, data: IRegisterForm }>
("stations/editStation",
    async function ({ id, data }, { dispatch }) {
        try {
            await stationsApi.updateStation(id, data)
            dispatch(getStations())
            dispatch(removeEditError(id))
        } catch (e: any) {
            dispatch(setStationEditError({ id: id, error: e.response.data.error }))
        }
    });

export const createStation = createAsyncThunk<boolean | void, IRegisterForm>
("stations/createStation",
    async function (data, { dispatch }) {
        try {
            await stationsApi.createStation(data)
            dispatch(getStations())
            dispatch(setStationCreateError(''))
            return true
        } catch (e: any) {
            dispatch(setStationCreateError(e.response.data.error))
        }
    });

let initialState: IStationState = {
    isFetching: false,
    stationsList: [],
    editError: [],
    createError: ''
};

const stationsSlice = createSlice({
    name: "stations",
    initialState,
    reducers: {
        setStations: (state, action: PayloadAction<IStation[]>) => {
            state.stationsList = action.payload
        },
        deleteSuccess: (state, action: PayloadAction<number>) => {
            const deletedStationId = action.payload
            state.stationsList = state.stationsList.filter((station) => station.id !== deletedStationId)
        },
        setFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        },
        setStationEditError: (state, action: PayloadAction<IEditError>) => {
            state.editError.push(action.payload)
        },
        setStationCreateError: (state, action: PayloadAction<string>) => {
            state.createError = action.payload
        },
        removeEditError: (state, action: PayloadAction<number>) => {
            state.editError = state.editError.filter(err => err.id !== action.payload)
        },
    },
});

export const {
    setStations,
    deleteSuccess,
    setFetching,
    setStationEditError,
    setStationCreateError,
    removeEditError
} = stationsSlice.actions;
export const stationsSelector = (state: RootState) => state.stations;
export default stationsSlice.reducer;
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux-store";
import { IRegisterForm } from "../../interfaces/IUser";
import { stationsApi } from "../../api/stations-api";
import { IStation } from "../../interfaces/IStation";

export const getStations = createAsyncThunk<void, void>
("stations/getUsers",
    async function (_, { dispatch }) {
        dispatch(setFetching(true))
        try {
            const response = await stationsApi.requestStations()
            dispatch(setStations(response))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(dispatch(setFetching(false)))
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
        } catch (e) {
            console.log(e)
        }
    });

export const createStation = createAsyncThunk<boolean | void, IRegisterForm>
("stations/createStation",
    async function (data, { dispatch }) {
        try {
            await stationsApi.createStation(data)
            dispatch(getStations())
            return true
        } catch (e: any) {
            console.log(e.response.data)
            dispatch(setError(e.response.data.error))
        }
    });

let initialState = {
    isFetching: false,
    stationsList: [] as IStation[],
    error: ''
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
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
    },
});

export const {
    setStations,
    deleteSuccess,
    setFetching,
    setError
} = stationsSlice.actions;
export const stationsSelector = (state: RootState) => state.stations;
export default stationsSlice.reducer;
import { IStation } from "./IStation";

export interface IStationState {
    isFetching: boolean,
    stationsList: IStation[],
    createError: string
    editError: IEditError[]
}

export interface IEditError {
    id: null | number,
    error: string
}
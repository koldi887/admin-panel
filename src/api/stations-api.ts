import { instance } from "./index";
import { IRegisterForm } from "../interfaces/IUser";
import { IStation } from "../interfaces/IStation";

export const stationsApi = {
    requestStations() {
        return instance
            .get<IStation[]>(`stations`)
            .then((response) => response.data);
    },

    updateStation(id: number, data: IRegisterForm) {
        return instance
            .patch<IStation>(`stations/${id}`, data)
            .then((response) => response.data)
    },

    createStation(data: IRegisterForm) {
        return instance
            .post<IStation>(`stations`, data)
            .then((response) => response.data)
    },

    deleteStation(id: number) {
        return instance
            .delete<IStation>(`stations/${id}`)
            .then((response) => response.data)
    },
}
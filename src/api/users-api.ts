import { instance } from "./index";
import { IUser, IRegisterForm } from "../interfaces/IUser";

export const usersApi = {
    createUser(data: IRegisterForm) {
        return instance
            .post(`users`, data)
            .then((response) => response.data)
    },
    requestUsers() {
        return instance
            .get<IUser[]>(`users`)
            .then((response) => response.data);
    },

    deleteUser(id: number) {
        return instance
            .delete<IUser>(`users/${id}`)
            .then((response) => response.data)
    },

    updateUser(id: number, data: IRegisterForm) {
        return instance
            .patch<IUser>(`users/${id}`, data)
            .then((response) => response.data)
    },

}
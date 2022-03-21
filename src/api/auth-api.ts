import { instance } from "./index";
import { IRegisterForm } from "../components/Registration";
import { ILoginForm } from "../components/Login";

export const authApi = {
    register(data: IRegisterForm) {
        return instance
            .post(`users`, data)
            .then((response) => response.data)
    },

    login(data: ILoginForm) {
        return instance
            .post<{ user_jwt: string }>(`users/auth`, data)
            .then((response) => response.data)
    },

    logout(id: number) {
        return instance
            .delete<{ user_jwt: string }>(`users/${id}`)
    },

    getMe(token: string) {
        return instance
            .get('users/me', {
                headers: {
                    'user-jwt': token
                }
            })
            .then((response) => response.data)
    }
}
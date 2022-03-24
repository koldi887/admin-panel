import { instance } from "./index";
import { ILoginForm } from "../components/LoginForm";
import { IUser } from "../interfaces/IUser";

export const authApi = {
    login(data: ILoginForm) {
        return instance
            .post<{ user_jwt: string }>(`users/auth`, data)
            .then((response) => response.data)
    },

    getMe() {
        return instance
            .get<IUser>('users/me')
            .then((response) => response.data)
    }
}
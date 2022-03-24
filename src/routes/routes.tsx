import { ProtectedRoutes } from "./ProtectedRoutes";
import { ErrorPage } from "../pages/ErrorPage";
import { TemplateForm } from "../components/TemplateForm";
import { LoginForm } from "../components/LoginForm";
import { UsersPage } from "../pages/UsersPage";
import { StationsPage } from "../pages/StationsPage";
import { MainPage } from "../pages/MainPage";

export enum ROUTE {
    MAIN = "/",
    LOGIN = "/login",
    REGISTER = "/register",
    USERS = "/users",
    STATIONS = "/stations",
    OTHER_ROUTES = "/*",
}

export const routesList = [
    {
        element: <ProtectedRoutes/>,
        children: [
            {
                path: ROUTE.USERS,
                element: <UsersPage/>,
            },
            {
                path: ROUTE.STATIONS,
                element: <StationsPage/>
            },
        ],
    },
    {
        path: ROUTE.MAIN,
        element: <MainPage/>,
    },
    {
        path: ROUTE.REGISTER,
        element: <TemplateForm/>,
    },
    {
        path: ROUTE.LOGIN,
        element: <LoginForm/>
    },
    {
        path: ROUTE.OTHER_ROUTES,
        element: <ErrorPage/>,
    },
]
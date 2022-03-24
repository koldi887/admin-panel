import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import usersSlice from "./reducers/usersSlice";
import stationsSlice from "./reducers/stationsSlice";

export const rootReducer = combineReducers({
    auth: authSlice,
    users: usersSlice,
    stations: stationsSlice
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

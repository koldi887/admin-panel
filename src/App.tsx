import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { authSelector, setInitialize } from "./redux/reducers/authSlice";
import { useRoutes } from 'react-router-dom'
import { PreLoader } from "./components/common/Preloader/Preloader";
import { Navbar } from "./components/navbar/Navbar";
import { routesList } from "./routes/routes";

import './App.css';

function App() {
    const { initialize } = useAppSelector(authSelector)
    const routes = useRoutes(routesList);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setInitialize())
    }, [])

    if (!initialize) return <PreLoader/>
    return (
        <div className="App">
            <Navbar/>
            {routes}
        </div>
    );
}

export default App;

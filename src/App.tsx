import React, { useEffect } from 'react';
import { Login, Registration } from "./components";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { authSelector, loginSuccess, logOutSuccess } from "./redux/reducers/authSlice";

import './App.css';

function App() {
    const { isAuth, isLoading } = useAppSelector(authSelector)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(loginSuccess())
        }
    }, [])

    const logoutHandler = () => {
        dispatch(logOutSuccess())
    }

    if (isLoading) return
    if (!isAuth) return <Login/>
    return (
        <div className="App">
            {/*<Login/>*/}
            {/*<br/>*/}
            <h1>SEES</h1>
            {/*<Registration/>*/}
            {/*<br/>*/}
            <button onClick={logoutHandler}>log out</button>
        </div>
    );
}

export default App;

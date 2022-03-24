import React from 'react';
import { AppBar, Box, Button, CssBaseline, Toolbar } from "@mui/material";
import companyLogo from '../../assets/piar.png'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { authSelector, logOutSuccess } from "../../redux/reducers/authSlice";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import { ROUTE } from "../../routes/routes";

export const Navbar = () => {
    const { isAuth } = useAppSelector(authSelector)

    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(logOutSuccess())
    }

    return (
        <>
            <CssBaseline/>
            <AppBar
                position="static"
                color="default"
                elevation={0}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link to={ROUTE.MAIN}>
                            <img src={companyLogo} alt="logo"/>
                        </Link>
                    </Box>
                    {isAuth && (
                        <>
                            <nav>
                                <NavLinks/>
                            </nav>
                            <Button
                                variant="outlined"
                                color={'error'}
                                sx={{ my: 1, mx: 1.5 }}
                                onClick={logoutHandler}
                            >
                                Sign Out
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
};


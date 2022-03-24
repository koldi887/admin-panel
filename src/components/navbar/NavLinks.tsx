import React from 'react';
import { Button } from "@mui/material";
import { ROUTE } from "../../routes/routes";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
    return (
        <>
            <Button
                component={NavLink}
                to={ROUTE.USERS}
                color="primary"
                sx={{ my: 1, mx: 1.5 }}
            >
                Users
            </Button>
            <Button
                component={NavLink}
                to={ROUTE.STATIONS}
                color="primary"
                sx={{ my: 1, mx: 1.5 }}
            >
                Stations
            </Button>
        </>
    );
};

export default NavLinks;
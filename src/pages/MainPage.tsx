import React from 'react';
import { Box, Button, Container } from "@mui/material";
import { ROUTE } from "../routes/routes";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { authSelector } from "../redux/reducers/authSlice";

export const MainPage: React.FC = () => {
    const { isAuth } = useAppSelector(authSelector)

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Button
                    disabled={isAuth}
                    component={Link}
                    to={ROUTE.LOGIN}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color='success'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Button
                    disabled={isAuth}
                    component={Link}
                    to={ROUTE.REGISTER}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
};

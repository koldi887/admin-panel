import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { authSelector, login, setAuthError } from "../redux/reducers/authSlice";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { ROUTE } from "../routes/routes";

export const LoginForm: React.FC = () => {
    const { register, handleSubmit } = useForm<ILoginForm>();
    const { isAuth, error } = useAppSelector(authSelector)

    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            if (error) dispatch(setAuthError(''))
        }
    }, [ error ])

    const onFormSubmit = handleSubmit((data) => {
        dispatch(login(data))
    });

    if (isAuth) return <Navigate to={ROUTE.USERS}/>
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sing In
                </Typography>
                {error && <span className='error'>{error}</span>}
                <Box component="form" onSubmit={onFormSubmit} noValidate
                     sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Login"
                        {...register('login', {
                            required: true
                        })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        {...register('password', {
                            required: true
                        })}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export interface ILoginForm {
    login: string
    password: string
}
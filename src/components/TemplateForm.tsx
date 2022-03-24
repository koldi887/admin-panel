import React from 'react';
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import { IRegisterForm, IUser } from "../interfaces/IUser";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE } from "../routes/routes";
import { IStation } from "../interfaces/IStation";
import { createUser, usersSelector } from "../redux/reducers/usersSlice";

interface IProps {
    item?: IUser | IStation
    title?: string
    callback?: (data: IRegisterForm, id?: number) => void
    formType?: boolean
}

export const TemplateForm: React.FC<IProps> = ({ item, title, callback }) => {
    const { register, handleSubmit } = useForm<IRegisterForm>();
    const { error } = useAppSelector(usersSelector)

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onFormSubmit = handleSubmit(async (data) => {
        if (callback) callback(data, item?.id)
        else {
            const response = await dispatch(createUser(data))
            if (response.payload) navigate(ROUTE.LOGIN)
        }
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {title ? title : 'Register'}
                </Typography>
                {error && <span className='error'>{error}</span>}
                <Box component="form" noValidate onSubmit={onFormSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                defaultValue={item?.name}
                                type='text'
                                label="Name"
                                {...register('name', {
                                    required: true
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                defaultValue={item?.comment}
                                type='text'
                                label="Comment"
                                {...register('comment', {
                                    required: true
                                })}
                            />
                        </Grid>
                        {location.pathname !== ROUTE.STATIONS && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        defaultValue={item?.login}
                                        type='text'
                                        label="Login"
                                        {...register('login', {
                                            required: true
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        {...register('password', {
                                            required: true
                                        })}
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {title ? title : 'Register'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

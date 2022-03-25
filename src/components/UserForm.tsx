import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { IRegisterForm, IUser } from "../interfaces/IUser";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../routes/routes";
import {
    createUser,
    removeEditError,
    setUserCreateError,
    usersSelector
} from "../redux/reducers/usersSlice";

interface IProps {
    item?: IUser
    title?: string
    editHandler?: (data: IRegisterForm, id: number) => void
    createHandler?: (data: IRegisterForm) => void
}

export const UserForm: React.FC<IProps> = (
    {
        item,
        title,
        editHandler,
        createHandler,
    }) => {
    const { register, handleSubmit } = useForm<IRegisterForm>();
    const { createError, editError } = useAppSelector(usersSelector)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const errorFilter = editError.find(err => err.id === item?.id)

    useEffect(() => {
        return () => {
            if (createError && createHandler) dispatch(setUserCreateError(''))
            if (errorFilter && item) dispatch(removeEditError(item.id))
            if (!createHandler && createError) dispatch(setUserCreateError(''))
        }
    }, [ createError, errorFilter ])

    const onFormSubmit = handleSubmit(async (data) => {
        if (editHandler && item) return editHandler(data, item.id)
        if (createHandler) return createHandler(data)
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

                {errorFilter && <span className='error'>{errorFilter?.error}</span>}
                {createHandler && createError && <span className='error'>{createError}</span>}
                {!createHandler && createError && <span className='error'>{createError}</span>}

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

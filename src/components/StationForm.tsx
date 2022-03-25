import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { IRegisterForm } from "../interfaces/IUser";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IStation } from "../interfaces/IStation";
import {
    removeEditError,
    setStationCreateError,
    stationsSelector
} from "../redux/reducers/stationsSlice";

interface IProps {
    item?: IStation
    title?: string
    editHandler?: (data: IRegisterForm, id: number) => void
    createHandler?: (data: IRegisterForm) => void
}

export const StationForm: React.FC<IProps> = ({ item, title, editHandler, createHandler }) => {
    const { register, handleSubmit } = useForm<IRegisterForm>();
    const { editError, createError } = useAppSelector(stationsSelector)

    const dispatch = useAppDispatch()

    const errorFilter = editError.find(err => err.id === item?.id)

    useEffect(() => {
        return () => {
            if (createError && createHandler) dispatch(setStationCreateError(''))
            if (errorFilter && item) dispatch(removeEditError(item.id))
        }
    }, [ createError, errorFilter ])

    const onFormSubmit = handleSubmit((data) => {
        if (editHandler && item) editHandler(data, item.id)
        if (createHandler) createHandler(data)
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
                    {title}
                </Typography>

                {errorFilter && <span className='error'>{errorFilter?.error}</span>}
                {createHandler && createError && <span className='error'>{createError}</span>}

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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {title}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

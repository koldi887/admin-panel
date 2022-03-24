import React, { useEffect } from 'react';
import { Title } from "../components/Title";
import {
    createStation,
    deleteStation,
    editStation,
    getStations,
    stationsSelector
} from "../redux/reducers/stationsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Button, Grid } from "@mui/material";
import { PreLoader } from "../components/common/Preloader/Preloader";
import { UserCard } from "../components/UserCard";
import { IRegisterForm } from "../interfaces/IUser";
import { useToggle } from "../hooks/useToggle";
import { CreateItemWindow } from "../components/CreateItemWindow";
import { setError } from "../redux/reducers/usersSlice";

export const StationsPage: React.FC = () => {
    const [ toggle, setToggle ] = useToggle(false)
    const { stationsList, isFetching } = useAppSelector(stationsSelector)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getStations())
    }, [])

    const editStationHandler = (data: IRegisterForm, id: number): void => {
        dispatch(editStation({ id, data }))
    }

    const deleteStationHandler = (id: number): void => {
        dispatch(deleteStation(id))
    }

    const stationCreatorHandler = async (data: IRegisterForm) => {
        const response = await dispatch(createStation(data))
        if (response.payload) setToggle()
    }

    const onCreateWindowClose = () => {
        dispatch(setError(''))
        setToggle()
    }

    return (
        <div className={'app__flex'}>
            <Title>Stations</Title>
            <Button variant={'contained'} onClick={setToggle}>Create station</Button>
            {toggle && (
                <div className='app__flex createForm'>
                    <CreateItemWindow
                        title={'Create Station'}
                        callback={stationCreatorHandler}
                        setToggle={onCreateWindowClose}
                    />
                </div>
            )}
            {isFetching ? <PreLoader/> : (
                <Grid container spacing={2} style={{ padding: '2rem' }}>
                    {stationsList.map((station) => {
                        return (
                            <Grid item xs={12} sm={4} md={4} xl={2} key={station.id}>
                                <UserCard
                                    item={station}
                                    editHandler={editStationHandler}
                                    deleteHandler={deleteStationHandler}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            )}
        </div>
    );
};


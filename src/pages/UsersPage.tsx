import React, { useEffect } from 'react';
import { Button, Grid } from "@mui/material";
import {
    createUser,
    deleteUser,
    editUser,
    getUsers, setError,
    usersSelector
} from "../redux/reducers/usersSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { UserCard } from "../components/UserCard";
import { Title } from "../components/Title";
import { PreLoader } from "../components/common/Preloader/Preloader";
import { IRegisterForm } from "../interfaces/IUser";
import { CreateItemWindow } from "../components/CreateItemWindow";
import { useToggle } from "../hooks/useToggle";

export const UsersPage: React.FC = () => {
    const [ toggle, setToggle ] = useToggle(false)
    const { usersList, isFetching } = useAppSelector(usersSelector)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    const editUserHandler = (data: IRegisterForm, id: number) => {
        dispatch(editUser({ id, data }))
    }

    const deleteUserHandler = (id: number) => {
        dispatch(deleteUser(id))
    }

    const userCreatorHandler = async (data: IRegisterForm) => {
        const response = await dispatch(createUser(data))
        if (response.payload) setToggle()
    }

    const onCreateWindowClose = () => {
        dispatch(setError(''))
        setToggle()
    }

    return (
        <div className={'app__flex'}>
            <Title>Users</Title>
            <Button variant={'contained'} onClick={setToggle}>Create user</Button>
            {toggle && (
                <div className='app__flex createForm'>
                    <CreateItemWindow
                        title={'Create User'}
                        callback={userCreatorHandler}
                        setToggle={onCreateWindowClose}
                    />
                </div>
            )}
            {isFetching ? <PreLoader/> : (
                <Grid container spacing={2} style={{ padding: '2rem' }}>
                    {usersList.map((user) => {
                        return (
                            <Grid item xs={12} sm={4} md={4} xl={2} key={user.id}>
                                <UserCard
                                    item={user}
                                    editHandler={editUserHandler}
                                    deleteHandler={deleteUserHandler}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            )}
        </div>
    )
};

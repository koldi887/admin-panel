import React, { useEffect } from 'react';
import { Button, Grid } from "@mui/material";
import {
    createUser,
    deleteUser,
    editUser,
    getUsers,
    usersSelector
} from "../redux/reducers/usersSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { TemplateCard } from "../components/TemplateCard";
import { Title } from "../components/Title";
import { PreLoader } from "../components/common/Preloader/Preloader";
import { IRegisterForm } from "../interfaces/IUser";
import { UserForm } from "../components/UserForm";
import { useToggle } from "../hooks/useToggle";

export const UsersPage: React.FC = () => {
    const [ toggle, setToggle ] = useToggle(false)
    const { usersList, isFetching } = useAppSelector(usersSelector)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    const deleteUserHandler = (id: number) => {
        dispatch(deleteUser(id))
    }

    const editUserHandler = (data: IRegisterForm, id: number) => {
        dispatch(editUser({ id, data }))
    }

    const userCreatorHandler = async (data: IRegisterForm) => {
        const response = await dispatch(createUser(data))
        if (response.payload) setToggle()
    }

    return (
        <div className={'app__flex'}>
            <Title>Users</Title>
            <Button
                variant={'contained'}
                color={toggle ? 'error' : 'primary'}
                onClick={setToggle}
            >
                {toggle ? 'Cancel' : 'Create User'}
            </Button>
            {toggle && <UserForm createHandler={userCreatorHandler} title={'Create Station'}/>}
            {isFetching ? <PreLoader/> : (
                <Grid container spacing={2} padding={3}>
                    {usersList.map((user) => {
                        return (
                            <Grid item xs={12} sm={4} md={4} xl={2} key={user.id}>
                                <TemplateCard item={user} deleteHandler={deleteUserHandler}>
                                    <UserForm
                                        title={'Edit'}
                                        item={user}
                                        editHandler={editUserHandler}
                                    />
                                </TemplateCard>
                            </Grid>
                        )
                    })}
                </Grid>
            )}
        </div>
    )
};

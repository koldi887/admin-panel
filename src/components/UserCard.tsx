import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import moment from "moment";
import { IRegisterForm, IUser } from "../interfaces/IUser";
import { useToggle } from "../hooks/useToggle";
import { IStation } from "../interfaces/IStation";
import { CreateItemWindow } from "./CreateItemWindow";

interface IProps {
    item: IUser | IStation
    editHandler: (data: IRegisterForm, id: number) => void
    deleteHandler: (id: number) => void
}

export const UserCard: React.FC<IProps> = (
    {
        item,
        editHandler,
        deleteHandler,
    }) => {
    const [ toggle, setToggle ] = useToggle(false)

    const dateFormat = moment(item.updated_at ? item.updated_at : item.created_at).startOf("minutes").fromNow()

    return (
        <Card>
            {toggle ?
                <div className='app__flex'>
                    <CreateItemWindow
                        title={'Edit'}
                        // @ts-ignore
                        callback={editHandler}
                        setToggle={setToggle}
                    />
                </div>
                : (
                    <>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Last update: {dateFormat}
                            </Typography>

                            <span><b>Name:</b> {item.name}</span>
                            <hr/>
                            {item?.login && (
                                <>
                                    <span><b>Login:</b> {item.login}</span>
                                    <hr/>
                                </>
                            )}
                            <span><b>Comment:</b> {item.comment}</span>
                            <hr/>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                onClick={setToggle}
                            >
                                Edit
                            </Button>
                            <Button
                                color={'error'}
                                size="small"
                                onClick={() => deleteHandler(item.id)}
                            >
                                Delete
                            </Button>
                        </CardActions>
                    </>
                )}
        </Card>
    );
};

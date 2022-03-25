import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { IUser } from "../interfaces/IUser";
import { useToggle } from "../hooks/useToggle";
import { IStation } from "../interfaces/IStation";
import moment from "moment";
import { EditFormWrapper } from "./EditFormWrapper";

interface IProps {
    item: IUser | IStation
    deleteHandler: (id: number) => void
}

export const TemplateCard: React.FC<IProps> = (
    {
        item,
        deleteHandler,
        children
    }) => {
    const [ toggle, setToggle ] = useToggle(false)

    const dateFormat = moment(item.updated_at ? item.updated_at : item.created_at).startOf("minutes").fromNow()

    return (
        <Card>
            {toggle ? <EditFormWrapper setToggle={setToggle}> {children} </EditFormWrapper> :
                (
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

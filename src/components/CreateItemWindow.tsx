import React from 'react';
import { Button } from "@mui/material";
import { TemplateForm } from "./TemplateForm";
import { IRegisterForm, IUser } from "../interfaces/IUser";
import { IStation } from "../interfaces/IStation";

interface IProps {
    item?: IUser | IStation
    title: string
    callback: (data: IRegisterForm, id?: number) => void
    setToggle: () => void
}

export const CreateItemWindow: React.FC<IProps> = (
    {
        item,
        title,
        callback,
        setToggle
    }) => {
    return (
        <>
            <Button
                color={'error'}
                onClick={setToggle}
                style={{ alignSelf: "end" }}
            >
                Cancel
            </Button>
            <TemplateForm
                item={item}
                title={title}
                // @ts-ignore
                callback={callback}
            />
        </>
    );
};


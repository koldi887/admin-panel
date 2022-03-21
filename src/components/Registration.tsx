import React from 'react';
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks/redux";
import { registration, } from "../redux/reducers/authSlice";

export const Registration = () => {
    const { register, handleSubmit } = useForm<IRegisterForm>();


    const dispatch = useAppDispatch()

    const onFormSubmit = handleSubmit((data) => {
        dispatch(registration(data))
    });

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <input
                    type="text"
                    placeholder='name'
                    {...register("name", {
                        required: true
                    })}
                />
                <input
                    type="text"
                    placeholder='comment'
                    {...register("comment", {
                        required: true
                    })}
                />
                <input
                    type="text"
                    placeholder='login'
                    {...register("login", {
                        required: true
                    })}
                />
                <input
                    type="password"
                    placeholder='password'
                    {...register("password", {
                        required: true
                    })}
                />
                <button type='submit'>submit</button>
            </form>
        </div>
    );
};

export interface IRegisterForm {
    name: string
    comment: string
    login: string
    password: string
}
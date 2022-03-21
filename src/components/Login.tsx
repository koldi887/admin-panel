import React from 'react';
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks/redux";
import { login } from "../redux/reducers/authSlice";

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();

    const dispatch = useAppDispatch()

    const onFormSubmit = handleSubmit((data) => {
        dispatch(login(data))
    });

    return (
        <div>
            <form onSubmit={onFormSubmit}>
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

export interface ILoginForm {
    login: string
    password: string
}
export interface IUser {
    comment: string
    created_at: string
    id: number
    login: string
    name: string
    updated_at: null | string
}

export interface IRegisterForm {
    name: string
    comment: string
    login: string
    password: string
}
import axios from "axios";

export const apiConfig = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {'API-KEY': '8f813530-5f30-4753-8d0a-a95ed67652cb'}
})

export type APIResponseTaskType<D = [], RC = ResultCodeEnum> = {
    messages: Array<string>
    items: D
    error: null | string
    totalCount: number
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    error: null | string
    resultCode: RC
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeCaptcha {
    CaptchaRequired = 10
}

export type GetItemsType<T> = {
    items: Array<T>
    totalCount: number
    error: string | null
}
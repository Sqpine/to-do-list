import {apiConfig, APIResponseType} from "./apiConfig";
import {LoginData, UserData} from "../REDUX/slices/authSlice";
import {AxiosResponse} from "axios";

export type AuthMe = {
    userId: number
}
export type CaptchaType = {
    url: string
}
export const AuthAPI = {
    authMe: (): Promise<AxiosResponse<APIResponseType<UserData>>> => {
        return apiConfig.get('auth/me')
    },
    login: (data: LoginData): Promise<AxiosResponse<APIResponseType<AuthMe>>> => {
        return apiConfig.post('auth/login', data)
    },
    logOut: (): Promise<AxiosResponse<APIResponseType<UserData>>> => {
        return apiConfig.delete('auth/login')
    },
    getCaptcha: (): Promise<AxiosResponse<CaptchaType>> => {
        return apiConfig.get('security/get-captcha-url\n')
    }
}

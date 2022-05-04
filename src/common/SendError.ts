import {ResultCodeEnum} from "../API/apiConfig";

export function sendError(errorCode: number, responseError: string) {
    if (errorCode === ResultCodeEnum.Error) throw Error(responseError)
}
import {Dispatch} from "@reduxjs/toolkit";
import axios from "axios";
import {setError} from "../REDUX/slices/appSlice";

export const ErrorCatcher = (error: unknown, dispatch: Dispatch) => {
    if (axios.isAxiosError(error)) {
        dispatch(setError({error: error.message}))
    } else dispatch(setError({error: `${error}`}))
}
import {createAsyncThunk, createSlice, isAnyOf, PayloadAction} from '@reduxjs/toolkit'
import {AuthAPI, AuthMe} from "../../API/authAPI";
import {RootState} from "../store";
import {ResultCodeCaptcha, ResultCodeEnum} from "../../API/apiConfig";
import axios from "axios";
import {setError} from "./appSlice";

const initialState: initialStateType = {
    userData: null,
    captcha: '',
    helperText: '',
    fetching: false
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCaptcha: (state, action: PayloadAction<{ captchaurl: string }>) => {
            state.captcha = action.payload.captchaurl
        },
        setErrorInformation: (state, action: PayloadAction<{ error: string }>) => {
            state.helperText = action.payload.error
        }
    },
    extraReducers: builder => {
        builder.addCase(loginUser.fulfilled, (state) => {
            state.fetching = false
        })
        builder.addCase(logOut.fulfilled, (state, action) => {
            if (action.payload === null) {
                state.userData = action.payload
            }
            state.fetching = false
        })
        builder.addCase(authMe.fulfilled, (state, action) => {
            if (action.payload.id) {
                state.userData = action.payload
            }
            state.fetching = false
        })
        builder.addMatcher(isAnyOf(authMe.pending, logOut.pending, loginUser.pending),
            (state) => {
                if (!state.fetching) {
                    state.fetching = true
                }
            })
    }
})

// Action creators are generated for each case reducer function
export const {setErrorInformation, setCaptcha} = authSlice.actions

export default authSlice.reducer


export type UserData = {
    id: number
    login: string
    email: string
}
export type LoginData = {
    email: string
    password: string
    captcha: string
}
export const loginUser = createAsyncThunk<AuthMe, LoginData, { dispatch: any }>(
    'authSlice/loginUser',
    async (data, {dispatch, rejectWithValue}) => {
        try {
            const response = await AuthAPI.login(data)
            const resultCode = response.data.resultCode
            if (resultCode === ResultCodeEnum.Success) {

                dispatch(authMe())
            } else if (resultCode === ResultCodeEnum.Error) {

                dispatch(setErrorInformation({error: response.data.messages[0]}))
            } else if (resultCode === ResultCodeCaptcha.CaptchaRequired) {

                const captcha = await AuthAPI.getCaptcha()
                dispatch(setCaptcha({captchaurl: captcha.data.url}))
                dispatch(setErrorInformation({error: response.data.messages[0]}))
            }
            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(setError({error: error.message}))
            } else dispatch(setError({error: `Some error occurred`}))
            return rejectWithValue('')
        }
    }
)
export const logOut = createAsyncThunk<null | void, void, {}>(
    'authSlice/logOut',
    async (_, {dispatch}) => {
        try {
            const response = await AuthAPI.logOut()
            if (response.data.resultCode === ResultCodeEnum.Success) {
                return null
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(setError({error: error.message}))
            } else dispatch(setError({error: `Some error occurred`}))

        }
    }
)

export const authMe = createAsyncThunk<UserData, void, { state: RootState }>(
    'authSlice/authMe',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const response = await AuthAPI.authMe()
            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(setError({error: error.message}))
            } else dispatch(setError({error: `Some error occurred`}))
            return rejectWithValue('')
        }
    }
)

type initialStateType = {
    userData: UserData | null
    fetching: boolean
    captcha: string
    helperText: string
}
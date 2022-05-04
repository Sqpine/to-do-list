import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type initialStateType = {
    initializeApp: boolean
    error: string
}
const initialState: initialStateType = {
    initializeApp: false,
    error: ''
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<{ error: string }>) => {
            state.error = action.payload.error
        }
    }
})

// Action creators are generated for each case reducer function
export const {setError} = appSlice.actions

export default appSlice.reducer
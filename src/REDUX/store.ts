import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {toDoSlice} from "./slices/toDoSlice";
import {authSlice} from "./slices/authSlice";
import {appSlice} from "./slices/appSlice";
import thunkMiddleware from 'redux-thunk'
import {tasksSlice} from "./slices/tasksSlice";

const rootReducer = combineReducers(
    {
        app: appSlice.reducer,
        toDoPage: toDoSlice.reducer,
        tasks: tasksSlice.reducer,
        auth: authSlice.reducer
    })

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
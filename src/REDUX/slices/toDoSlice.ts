import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit'
import {TasksApi, TaskStatuses} from "../../API/tasksApi";
import {RootState} from "../store";
import {sendError} from "../../common/SendError";
import {ErrorCatcher} from "../../common/ErrorCatcher";

const initialState: initialStateType = {
    toDoTasks: [],
    fetching: false,
    toDoFetching: false
}

export const toDoSlice = createSlice({
    name: 'toDoSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getToDo.pending, (state) => {
            if (!state.toDoFetching) {
                state.toDoFetching = true
            }
        })
        builder.addCase(getToDo.fulfilled, (state, action) => {
            state.toDoTasks = action.payload
            state.toDoFetching = false
        })
        builder.addCase(setToDo.pending, (state) => {
            if (!state.toDoFetching) {
                state.toDoFetching = true
            }
        })
        builder.addCase(setToDo.fulfilled, (state, action) => {
            state.toDoTasks = [action.payload, ...state.toDoTasks]
            state.toDoFetching = false
        })
        builder.addCase(removeToDo.fulfilled, (state, action) => {
            state.toDoTasks = action.payload
            state.fetching = false
        })
        builder.addCase(updateToDoTittle.fulfilled, (state, action) => {
            state.toDoTasks = action.payload
            state.fetching = false
        })
        builder.addMatcher(isAnyOf(updateToDoTittle.pending, removeToDo.pending), (state) => {
            if (!state.fetching) {
                state.fetching = true
            }
        })
        builder.addMatcher(isAnyOf(getToDo.rejected, setToDo.rejected,),
            (state) => {
                state.toDoFetching = false
            })
        builder.addMatcher(isAnyOf(setToDo.pending, getToDo.pending), (state) => {
            if (!state.toDoFetching) {
                state.toDoFetching = true
            }
        })

    }
})

export default toDoSlice.reducer

export const getToDo = createAsyncThunk<ToDoListType[], void, {}>(
    'tasks/getToDo',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const response = await TasksApi.getToDo()
            return response.data
        } catch (error) {
            ErrorCatcher(error, dispatch)
            return rejectWithValue('')
        }
    }
)

export const setToDo = createAsyncThunk<ToDoListType, string, {}>(
    'tasks/setToDo',
    async (tittle, {rejectWithValue, dispatch}) => {
        try {
            const response = await TasksApi.setToDo(tittle)
            const resultCode = response.data.resultCode
            const responseMessage = response.data.messages[0]

            sendError(resultCode, responseMessage)
            return response.data.data.item
        } catch (error) {
            ErrorCatcher(error, dispatch)
            return rejectWithValue('')
        }
    }
)

export const removeToDo = createAsyncThunk<ToDoListType[], string, { state: RootState }>(
    'tasks/removeToDo',
    async (id, {rejectWithValue, dispatch, getState}) => {
        try {
            const response = await TasksApi.removeToDo(id)

            const resultCode = response.data.resultCode
            const responseMessage = response.data.messages[0]
            sendError(resultCode, responseMessage)

            return getState().toDoPage.toDoTasks.filter(e => e.id !== id)
        } catch (error) {
            ErrorCatcher(error, dispatch)
            return rejectWithValue('')
        }
    }
)

type updateTaskTittleType = { id: string, title: string }
export const updateToDoTittle = createAsyncThunk<ToDoListType[], updateTaskTittleType, { state: RootState }>(
    'tasks/updateToDoTittle',
    async (parameters, {rejectWithValue, dispatch, getState}) => {
        try {
            const response = await TasksApi.updateToDoTittle(parameters.title, parameters.id)

            const resultCode = response.data.resultCode
            const responseMessage = response.data.messages[0]

            sendError(resultCode, responseMessage)

            let state = [...getState().toDoPage.toDoTasks]
            const index = state.findIndex((e) => e.id === parameters.id)

            if (index > -1) {
                state[index] = {...state[index], title: parameters.title}
            }
            return state
        } catch (error) {
            ErrorCatcher(error, dispatch)
            return rejectWithValue('')
        }
    }
)

export type ToDoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TaskType = {
    description: string
    title: string
    priority: number
    startDate: string
    deadline: string
    status: TaskStatuses
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type initialStateType = {
    toDoTasks: ToDoListType[]
    fetching: boolean
    toDoFetching: boolean
}
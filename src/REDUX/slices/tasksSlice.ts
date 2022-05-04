import {createAsyncThunk, createSlice, isAnyOf, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {TasksApi, TaskStatuses, UpdateStatusType} from "../../API/tasksApi";
import {sendError} from "../../common/SendError";
import {ErrorCatcher} from "../../common/ErrorCatcher";

const initialState: initialStateType = {
    tasks: {},
    fetching: false,
}

export const tasksSlice = createSlice({
    name: 'taskPage',
    initialState,
    reducers: {
        resetTasks: (state = initialState, action: PayloadAction<{ id: string }>) => {
            if (state.tasks[action.payload.id]) {
                delete state.tasks[action.payload.id]
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(setTasks.fulfilled, (state, action) => {
            if (action.payload.items.length > 0) {
                const taskId = action.payload.items[0].todoListId
                const listTask = action.payload.items
                const totalCount = action.payload.totalCount

                state.tasks[taskId] = {listTask, totalCount}
            }
            state.fetching = false
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            const {tasks, count} = action.payload
            if (tasks.length > 0) {
                const taskListId = tasks[0].todoListId

                state.tasks[taskListId] = {
                    listTask: tasks,
                    totalCount: count
                }
            }
            state.fetching = false
        })
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const {listTask, todoListId} = action.payload
            if (action.payload.listTask.length > 0) {
                state.tasks[todoListId].listTask = listTask
            } else {
                delete state.tasks[todoListId]
            }
            state.fetching = false
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            if (action.payload.length > 0) {
                const id = action.payload[0].todoListId
                state.tasks[id].listTask = action.payload
            }
            state.fetching = false
        })
        builder.addMatcher(isAnyOf(setTasks.pending, addTask.pending, updateTask.pending, removeTask.pending),
            (state) => {
                if (!state.fetching) {
                    state.fetching = true
                }
            })
        builder.addMatcher(isAnyOf(
                setTasks.rejected, addTask.rejected,
                updateTask.rejected, removeTask.rejected,),
            (state) => {
                state.fetching = false
            })
    }
})

// Action creators are generated for each case reducer function
export const {resetTasks} = tasksSlice.actions

export default tasksSlice.reducer

type setTasksReturnType = { items: TaskType[], totalCount: number }
type setTasksParamsType = {
    toDoId: string
    page: number
}
export const setTasks = createAsyncThunk<setTasksReturnType, setTasksParamsType, { state: RootState }>(
    'taskPage/setTasks',
    async (params, {rejectWithValue, dispatch, getState}) => {
        try {
            const response = await TasksApi.getTask(params.toDoId, params.page)

            if (!response.data.error) {
                const items = response.data.items
                const totalCount = response.data.totalCount
                return {items, totalCount}
            } else {
                throw new Error(response.data.messages[0])
            }
        } catch (error) {
            ErrorCatcher(error, dispatch)
            return rejectWithValue('')
        }
    }
)

type SetDayTaskType = { id: string, title: string }
type addTaskResponse = { tasks: TaskType[], count: number }

export const addTask = createAsyncThunk<addTaskResponse, SetDayTaskType, { state: RootState }>(
    'tasks/setTask',
    async (parameters, {rejectWithValue, dispatch, getState}) => {
        try {
            const response = await TasksApi.setTask(parameters.title, parameters.id)

            const resultCode = response.data.resultCode
            const responseMessage = response.data.messages[0]
            sendError(resultCode, responseMessage)

            const task = response.data.data.item
            const tasks = getState().tasks.tasks
            if (tasks[task.todoListId]) {
                let {listTask, totalCount} = tasks[task.todoListId]
                if (listTask && listTask.length === 5) {
                    listTask = listTask.slice(0, 4)
                }
                totalCount = totalCount + 1
                return {
                    tasks: [task, ...listTask],
                    count: totalCount
                }
            }
            return {
                tasks: [task],
                count: 1
            }

        } catch (error) {
            ErrorCatcher(error, dispatch)
            return rejectWithValue('')
        }
    }
)

type UpdateStatusParams = {
    todolistId: string
    taskId: string
    data: UpdateStatusType
}
export const updateTask = createAsyncThunk<TaskType[], UpdateStatusParams, { state: RootState }>(
    'tasks/updateTask',
    async (parameters, {rejectWithValue, dispatch, getState}) => {
        try {
            const {todolistId, taskId} = parameters
            const response = await TasksApi.updateStatusTask(todolistId, taskId, parameters.data)

            const resultCode = response.data.resultCode
            const responseMessage = response.data.messages[0]
            sendError(resultCode, responseMessage)

            const toDoId = response.data.data.item.todoListId
            // const taskId = response.data.data.item.id
            const responseTask = response.data.data.item
            const toDoTasks = getState().tasks.tasks
            const tasks = [...toDoTasks[toDoId].listTask]

            const index = tasks.findIndex(e => e.id === taskId)
            if (index > -1) {
                tasks[index] = {...responseTask}
            }
            return tasks
        } catch (error) {
            ErrorCatcher(error, dispatch)
            return rejectWithValue('')
        }
    }
)
type RemoveTaskType = {
    todolistId: string
    taskId: string
}
type RemoveTaskResponseType = {
    listTask: TaskType[]
    todoListId: string
}
export const removeTask = createAsyncThunk<RemoveTaskResponseType, RemoveTaskType, { state: RootState }>(
    'taskPage/removeTask',
    async (params, {rejectWithValue, dispatch, getState}) => {
        try {
            const {todolistId, taskId} = params
            const response = await TasksApi.removeTask(todolistId, taskId)

            const resultCode = response.data.resultCode
            const responseMessage = response.data.messages[0]

            sendError(resultCode, responseMessage)
            const listTask = getState().tasks.tasks
            const currentTask = listTask[todolistId].listTask.filter(t => t.id !== taskId)

            return {
                listTask: currentTask,
                todoListId: todolistId
            }
        } catch (error) {
            ErrorCatcher(error, dispatch)
            return rejectWithValue('')
        }
    }
)

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TaskInfo = {
    listTask: Array<TaskType>
    totalCount: number
}
export type TasksType = {
    [key: string]: TaskInfo
}
type initialStateType = {
    tasks: TasksType
    fetching: boolean
}
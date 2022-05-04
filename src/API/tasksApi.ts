import {apiConfig, APIResponseTaskType, APIResponseType} from "./apiConfig";
import {AxiosResponse} from "axios";
import {TaskType, ToDoListType} from "../REDUX/slices/toDoSlice";

export const TasksApi = {

    getToDo: (): Promise<AxiosResponse<ToDoListType[]>> => {
        return apiConfig.get('todo-lists')
    },
    setToDo: (data: string): Promise<AxiosResponse<APIResponseType<{ item: ToDoListType }>>> => {
        return apiConfig.post('todo-lists', {title: data})
    },
    updateToDoTittle: (title: string, id: string): Promise<AxiosResponse<APIResponseType>> => {
        return apiConfig.put(`todo-lists/${id}`, {title})
    },
    setTask: (tittle: string, todolistId: string): Promise<AxiosResponse<APIResponseType<{ item: TaskType }>>> => {
        return apiConfig.post(`todo-lists/${todolistId}/tasks`, {title: tittle})
    },
    getTask: (todolistId: string, page: number = 1, count: number = 5): Promise<AxiosResponse<APIResponseTaskType<TaskType[]>>> => {
        return apiConfig.get(`todo-lists/${todolistId}/tasks?count=${count}&page=${page}`)
    },
    updateStatusTask: (todolistId: string, taskId: string, data: UpdateStatusType): Promise<AxiosResponse<APIResponseType<{ item: TaskType }>>> => {
        return apiConfig.put(`todo-lists/${todolistId}/tasks/${taskId}`, data)
    },
    removeTask: (todolistId: string, taskId: string): Promise<AxiosResponse<APIResponseType>> => {
        return apiConfig.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    removeToDo: (id: string): Promise<AxiosResponse<APIResponseType>> => {
        return apiConfig.delete(`todo-lists/${id}`)
    }
}
export type UpdateStatusType = {
    title: string
    description: string | null
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
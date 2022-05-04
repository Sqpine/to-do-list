import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getToDo} from "../../REDUX/slices/toDoSlice";
import {ToDoTittleForm} from "./ToDoItem/ToDoTittleForm";
import s from '../../App.module.css'
import {ToDoList} from "./ToDoItem/ToDoList";
import {RootState} from "../../REDUX/store";
import {UserData} from "../../REDUX/slices/authSlice";
import {Navigate} from "react-router-dom";

export const ToDoPage = () => {
    const dispatch = useDispatch()
    const userData = useSelector<RootState, UserData | null>(state => state.auth.userData)

    useEffect(() => {
        if (userData) {
            dispatch(getToDo())
        }
    }, [])

    if (!userData) {
        return <Navigate to="/login" replace/>
    }
    return (
        <div className={s.toDoPage}>
            <ToDoTittleForm/>
            <ToDoList/>
        </div>
    )
}
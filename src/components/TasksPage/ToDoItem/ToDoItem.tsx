import React, {useEffect, useState} from "react";
import s from '../../../App.module.css'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import {removeToDo} from "../../../REDUX/slices/toDoSlice";
import {TaskForm} from "../TaskItem/TaskForm";
import {resetTasks} from "../../../REDUX/slices/tasksSlice";
import {Tasks} from "../TaskItem/Tasks";
import {InactiveEditToDoItem} from "./InactiveEditToDoItem";
import {ActiveEditToDoItem, ActiveEditToDoItemType} from "./ActiveEditToDoItem";
import {withValidation} from "../../../common/HOC/withValidation";

type PropsType = {
    toDoId: string
    title: string
    addedDate: string
    order: number
}
export const ToDoItem = React.memo((props: PropsType) => {
    const dispatch = useDispatch()

    const [isEdit, setEdit] = useState<boolean>(false)

    useEffect(() => {
        if (isEdit) {
            setEdit(false)
        }
    }, [props.title])

    useEffect(() => {
        return () => {
            dispatch(resetTasks({id: props.toDoId}))
        }
    }, [])

    const removeTaskHandler = () => {
        dispatch(removeToDo(props.toDoId))
    }

    const activeHandler = () => {
        if (isEdit) {
            setEdit(false)
        } else setEdit(true)
    }

    const ActiveEditToDoItemWithValidation = withValidation<ActiveEditToDoItemType>(ActiveEditToDoItem)
    return (
        <div className={s.task}>
            <IconButton
                aria-label="delete"
                onClick={() => removeTaskHandler()}
                style={{verticalAlign: 'middle'}}
            >
                <DeleteIcon/>

            </IconButton>
            {isEdit ?
                <ActiveEditToDoItemWithValidation
                    activeHandler={activeHandler}
                    isEdit
                    title={props.title}
                    toDoId={props.toDoId}
                />
                :
                <InactiveEditToDoItem
                    activeHandler={activeHandler}
                    tittle={props.title}
                />
            }
            <TaskForm id={props.toDoId}/>
            <Tasks toDoId={props.toDoId}/>
        </div>
    )
})

import React from "react";
import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {removeTask} from "../../../REDUX/slices/tasksSlice";
import {useDispatch} from "react-redux";

type PropsType = {
    title: string
    status: number
    isFetching: boolean
    activeHandler: () => void
    id: string
    todoListId: string
    setFetching: (action: boolean) => void
}

export const InactiveEditTaskItem = (props: PropsType) => {
    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTask({
            todolistId: props.todoListId,
            taskId: props.id
        }))
        if (!props.isFetching) {
            props.setFetching(true)
        }
    }

    return (
        <>
            <Typography
                variant="h6"
                noWrap
                component="div"
                style={{textDecoration: props.status === 2 ? 'line-through' : 'none',}}
            >
                {props.title}
            </Typography>
            <IconButton color="primary" aria-label="upload picture"
                        disabled={props.isFetching}
                        onClick={() => props.activeHandler()} component="span">
                <EditIcon sx={{width: 20}}/>
            </IconButton>
            <IconButton color="primary"
                        disabled={props.isFetching}
                        onClick={() => removeTaskHandler()} component="span">
                <DeleteIcon sx={{width: 20}}/>
            </IconButton>
        </>
    )
}
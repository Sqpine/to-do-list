import React, {RefObject} from "react";
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import {TaskStatuses} from "../../../API/tasksApi";
import {RefType} from "../ToDoItem/ActiveEditToDoItem";

export type ActiveEditTaskItemType = {
    activeHandler: (action: boolean) => void
    status: TaskStatuses
    title: string
    updateHandler: (status: TaskStatuses, title: string) => void
    toDoId: string
    isEdit: boolean
}
export type PropsType = {
    activeHandler: (action: boolean) => void
    title: string
    status: TaskStatuses
    setTitleHandler: (v: string) => void
    titleValidate: string
    updateHandler: (status: TaskStatuses, title: string) => void
    ref: RefObject<HTMLDivElement> | ((instance: HTMLDivElement | null) => void) | null | undefined
    toDoId: string
    isEdit: boolean
}

export const ActiveEditTaskItem = React.forwardRef((props: PropsType, ref: RefType) => {
    console.log(props.title)
    return (
        <span ref={ref}>
            <TextField
                size='small'
                multiline
                id="filled-textarea"
                variant="filled"
                type="text"
                value={props.title}
                style={{width: '60%'}}
                onChange={e => props.setTitleHandler(e.currentTarget.value)}
                error={Boolean(props.titleValidate)}
                helperText={props.titleValidate && props.titleValidate}
            />
            <IconButton color="primary" aria-label="upload picture"
                        style={{verticalAlign: 'middle'}}
                        disabled={Boolean(props.titleValidate)}
                        onClick={() => {
                            props.updateHandler(props.status, props.title)
                        }} component="span">
                <CheckIcon/>
            </IconButton>
        </span>
    )
})
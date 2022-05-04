import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {addTask} from "../../../REDUX/slices/tasksSlice";
import {TextField} from "@mui/material";
import s from "../../../App.module.css";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

type PropsType = {
    id: string
}

export const TaskForm = (props: PropsType) => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [titleValidate, setTitleValidate] = useState('')

    const setTitleHandler = (value: string) => {
        if (value.length > 100) {
            setTitleValidate('Max length: 100')
        } else setTitleValidate('')
        setTitle(value)
    }
    const TitleHandler = () => {
        if (!titleValidate && title) {
            dispatch(addTask({title, id: props.id}))
            setTitle('')
        } else setTitleValidate('Required')
    }

    return (
        <div style={{margin: '20px 0 0 0'}}>
            <TextField
                className={s.field}
                focused
                id="task"
                name="task"
                label="Task"
                type="task"
                size='small'
                value={title}
                onChange={e => setTitleHandler(e.currentTarget.value)}
                error={Boolean(titleValidate)}
                helperText={titleValidate && titleValidate}
            />
            <IconButton color="primary"
                        onClick={() => TitleHandler()} component="span">
                <AddIcon/>
            </IconButton>
        </div>
    )
}
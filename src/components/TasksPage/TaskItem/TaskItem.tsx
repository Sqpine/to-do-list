import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {TaskType, updateTask} from "../../../REDUX/slices/tasksSlice";
import {Box} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {ActiveEditTaskItem, ActiveEditTaskItemType} from "./ActiveEditTaskItem";
import {InactiveEditTaskItem} from "./InactiveEditTaskItem";
import {TaskStatuses} from "../../../API/tasksApi";
import {withValidation} from "../../../common/HOC/withValidation";

type PropsTypeTask = {
    task: TaskType
    checked: boolean
}
export const TaskItem = React.memo((props: PropsTypeTask) => {
    const {status, priority, startDate, deadline, id, title, todoListId} = props.task

    const dispatch = useDispatch()

    const [isEdit, setEdit] = useState<boolean>(false)
    const [isFetching, setFetching] = useState<boolean>(false)


    useEffect(() => {
        if (isFetching) {
            setFetching(false)
        }
        if (isEdit) {
            setEdit(false)
        }
    }, [props])


    const updateHandler = (statusTask: TaskStatuses | boolean, titleTask: string = title) => {
        const data = {
            title: titleTask,
            description: null,
            status: statusTask ? 2 : 0,
            priority: priority,
            startDate: startDate,
            deadline: deadline,
        }
        dispatch(updateTask({todolistId: todoListId, taskId: id, data: data}))
    }

    const activeHandler = () => {
        if (isEdit) {
            setEdit(false)
        } else setEdit(true)
    }

    const ActiveEditTaskItemWithValidation = withValidation<ActiveEditTaskItemType>(ActiveEditTaskItem)

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
            }}
            style={{margin: '5px 0 0 0'}}
        >
            <Checkbox checked={props.checked}
                      onChange={event => updateHandler(event.currentTarget.checked)}
                      disabled={isFetching} style={{verticalAlign: 'middle'}}/>
            {isEdit ?
                <ActiveEditTaskItemWithValidation
                    title={title}
                    activeHandler={activeHandler}
                    isEdit={isEdit}
                    toDoId={todoListId}
                    updateHandler={updateHandler}
                    status={status}
                />
                :
                <InactiveEditTaskItem
                    activeHandler={activeHandler}
                    isFetching={isFetching}
                    status={status}
                    title={title}
                    id={id}
                    setFetching={setFetching}
                    todoListId={todoListId}
                />
            }
        </Box>
    )
})

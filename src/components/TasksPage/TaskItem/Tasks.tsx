import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setTasks, TasksType} from "../../../REDUX/slices/tasksSlice";
import {RootState} from "../../../REDUX/store";
import {TaskItem} from "./TaskItem";
import {Pagination} from "@mui/material";

type PropsTypeTasks = {
    toDoId: string
}
export const Tasks = (props: PropsTypeTasks) => {
    const dispatch = useDispatch()

    const [page, setPage] = useState<number>(1);
    const [currentCountTasks, setCountTasks] = useState<number>();
    const [countPages, setCountPages] = useState<number>();

    const allTasks = useSelector<RootState, TasksType>(state => state.tasks.tasks)

    const currentTasks = allTasks[props.toDoId]
    const countTasks = currentTasks && currentTasks.totalCount ? currentTasks.totalCount : 0

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        if (value > 0) {
            setPage(value)
        }
    }

    useEffect(() => {
        dispatch(setTasks({toDoId: props.toDoId, page}))
    }, [])

    useEffect(() => {
        if (currentCountTasks && currentCountTasks - 5 > 0) {
            dispatch(setTasks({toDoId: props.toDoId, page}))
        }
    }, [page])

    useEffect(() => {
        if (currentCountTasks) {
            const count = Math.ceil(currentCountTasks / 5)
            setCountPages(count)
        }
    }, [currentCountTasks])

    useEffect(() => {
        if (countTasks > 0 && currentCountTasks !== countTasks) {
            setCountTasks(countTasks)
        }
        if (!currentTasks) {
            if (countPages === page) {
                setPage(prevState => prevState - 1)
            } else if (currentCountTasks && currentCountTasks - 5 > 0) {
                dispatch(setTasks({toDoId: props.toDoId, page}))
            }
        }
    }, [countTasks])

    return (
        <div style={{margin: '30px 0 0 0'}}>
            {
                currentTasks
                &&
                <>
                    {currentTasks.listTask.map(e => {
                            const checked = e.status === 2
                            return (
                                <TaskItem
                                    key={e.id}
                                    task={e}
                                    checked={checked}
                                />
                            )
                        }
                    )}
                    {
                        countTasks > 5
                        &&
                        <Pagination
                            onChange={handleChange} page={page}
                            count={countPages} hidePrevButton hideNextButton
                        />
                    }
                </>
            }
        </div>
    )
}

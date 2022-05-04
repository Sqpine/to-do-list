import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../REDUX/store";
import {ToDoListType} from "../../../REDUX/slices/toDoSlice";
import {ToDoItem} from "./ToDoItem";
import s from '../../../App.module.css'
import emptyList from '../../../img/empty-list.png'
import {Preloader} from "../../../common/Preloader";

export const ToDoList = () => {

    const taskList = useSelector<RootState, ToDoListType[]>(state => state.toDoPage.toDoTasks)
    const isFetching = useSelector<RootState, boolean>(state => state.toDoPage.toDoFetching)

    if (isFetching && taskList.length === 0) {
        return <Preloader/>
    }

    return (
        <div className={s.tasks}>
            {taskList.length === 0 ?
                <img style={{width: '20%', height: 'auto'}} src={emptyList} alt="Empty list"/>
                :
                taskList.map(e => <ToDoItem
                    key={e.id}
                    title={e.title}
                    toDoId={e.id}
                    addedDate={e.addedDate}
                    order={e.order}
                />)
            }
        </div>
    )
}

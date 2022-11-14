import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemFormPropsType";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType, ) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter( props.id,"all");
    const onActiveClickHandler = () => props.changeFilter(props.id,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.id,"completed");
    const removeTodolist = () => props.removeTodolist(props.id)

    const addTask = (title: string) => {// f wrapper= props - id
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = () => props.changeTodolistTitle(props.id, props.title)


    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            {/*{props.title} */}
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                      {/*  <input type="checkbox"
                               onChange={onChangeStatusHandler}
                               checked={t.isDone}/>*/}
                        <Checkbox
                               onChange={onChangeStatusHandler}
                               checked={t.isDone}/>
                        {/*<span>{t.title}---</span>*/}
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            {/*<Button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</Button>*/}
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.filter === 'active' ? "contained" : "text"}
                onClick={onActiveClickHandler}>Active</Button>
            <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"}
                onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}

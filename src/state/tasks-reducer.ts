import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    newTitle: string,
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string
    isDone: boolean,
    todolistId: string
}
type ActionType = RemoveTaskActionType | RemoveTodolistActionType | AddTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType | AddTodolistActionType

const initialState: TaskStateType = {}

export const todolistsReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            let tasks = state[action.todolistId]
             const newFilteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = newFilteredTasks
            return stateCopy
        }

        case "ADD-TASK": {
            const stateCopy = {...state}
            let tasks = state[action.todolistId]
            let newTask = {id: v1(), title: action.title, isDone: false}
            let newTasks =  [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }

        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(tl => tl.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
                /* let todolistTasks = tasks[todolistId]
                     let task = todolistTasks.find(tl => tl.id === id);
                     if (task) {
                    }      task.isDone = isDone;*/
            }
            return stateCopy
        }

        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(tl => tl.id === action.taskId);
            if (task) {
                task.title = action.newTitle;
        }
            return stateCopy
        }

        case 'ADD-TODOLIST': {//+
            const stateCopy = {...state}
                stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy

        default:
            // throw new Error('Error')
            return state
    }
}

// func action creator
export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId: taskId, todolistId:  todolistId}
}
export const AddTaskAC = (newTodolistTitle: string,  todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title: newTodolistTitle, todolistId: todolistId}
}
export const  ChangeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, newTitle, todolistId }
}
export const ChangeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId}
}


export default todolistsReducer
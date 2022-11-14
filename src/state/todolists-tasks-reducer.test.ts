import {TaskStateType, TodoListType} from "../App";
import {AddTodolistAC, todolistsReducer} from "./todolists-reducer";
import tasksReducer from "./tasks-reducer";


test('ids should be equals', () => {
   const startTaskState: TaskStateType = {}
   const startTodolistsState: Array<TodoListType> = []

   const action = AddTodolistAC('new todolist')

   const endTasksState = tasksReducer(startTaskState, action)
   const endTodolistsState = todolistsReducer(startTodolistsState, action)

   const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)

})




import { createSlice } from '@reduxjs/toolkit'
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true }

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        create(state, action) {
            state.entities.push(action.payload)
            state.isLoading = false
            console.log(state.entities)
        },
        recived(state, action) {
            console.log(action.payload)
            state.entities = action.payload
            state.isLoading = false
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(el => el.id === action.payload.id)
            state.entities[elementIndex] = {...state.entities[elementIndex], ...action.payload}
        },
        remove(state, action) {
            state.entities = state.entities.filter((el) => el.id !== action.payload.id)
        },
        taskRequested(state) {
            state.isLoading = true
        },
        taskRequestFailed(state, action) {
            state.isLoading = false
        }
    }
})

const { actions, reducer: taskReducer } = taskSlice
const { update, remove, recived, taskRequested, taskRequestFailed, create } = actions

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(recived(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const completeTask = (id) => (dispatch) => {
    dispatch(update({id, completed: true}))
}

export const titleChange = (id) => (dispatch) => {
    dispatch(update({id, title: `New title for ${id}`}))
}

export const taskDeleted = (id) => (dispatch) => {
    dispatch(remove({id}))
}

export const createTask = (newTitle) => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.createTodo({userId: 1, title: newTitle, completed: false})
        dispatch(create(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const getTasks = () => (state) => state.tasks.entities

export const getTaskLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer

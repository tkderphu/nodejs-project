import store from "../store"
import { CREATE_TODO_BEGIN, CREATE_TODO_FAILED, CREATE_TODO_SUCCESS, DELETE_TODO_BEGIN, DELETE_TODO_FAILED, DELETE_TODO_SUCCESS, FETCH_TODO_BEGIN, FETCH_TODO_FAILED, FETCH_TODO_SUCCESS, UPDATE_TODO_BEGIN, UPDATE_TODO_FALIED, UPDATE_TODO_SUCCESS } from "./todo.action.type"

const fetchState: any = {
    todos: [],
    error: "",
    hasError: false,
    loading: false
}
export const fetchTodoReducer = (state = fetchState, action: any) => {
    switch (action.type) {
        case FETCH_TODO_BEGIN:
            return {
                ...state,
                loading: true
            }
        case FETCH_TODO_SUCCESS:
            return {
                todos: action.payload,
                error: "",
                hasError: false,
                loading: false
            }
        case FETCH_TODO_FAILED:
            return {
                todos: [],
                error: action.payload,
                hasError: true,
                loading: false
            }
        case DELETE_TODO_SUCCESS:
            const todoId = action.payload
            return {
                todos: state.todos.filter((state: any) => state._id != todoId),
                error: "",
                hasError: false,
                loading: false
            }
        default: return state
    }
}
const createState: any = {
    todo: '',
    error: "",
    hasError: false,
    loading: false
}
export const createTodoReducer = (state = createState, action: any) => {
    switch (action.type) {
        case CREATE_TODO_BEGIN:
            return {
                ...state,
                loading: true
            }
        case CREATE_TODO_SUCCESS:
            return {
                todo: action.payload,
                error: "",
                hasError: false,
                loading: false
            }
        case CREATE_TODO_FAILED:
            return {
                todo: '',
                error: action.payload,
                hasError: true,
                loading: false
            }
        default: return state
    }
}
const updateState: any = {
    todo: '',
    error: "",
    hasError: false,
    loading: false
}
export const updateTodoReducer = (state = updateState, action: any) => {
    switch (action.type) {
        case UPDATE_TODO_BEGIN:
            return {
                ...state,
                loading: true
            }
        case UPDATE_TODO_SUCCESS:
            return {
                todo: action.payload,
                error: "",
                hasError: false,
                loading: false
            }
        case UPDATE_TODO_FALIED:
            return {
                todo: '',
                error: action.payload,
                hasError: true,
                loading: false
            }
        default: return state
    }
}
const deleteState: any = {
    error: "",
    hasError: false,
    loading: false
}
export const deleteTodoReducer = (state = deleteState, action: any) => {
    switch (action.type) {
        case DELETE_TODO_BEGIN:
            return {
                ...state,
                loading: true
            }
        case DELETE_TODO_FAILED:
            return {
                todoIdIsDeleted: '',
                error: action.payload,
                hasError: true,
                loading: false
            }
        default: return state
    }
}
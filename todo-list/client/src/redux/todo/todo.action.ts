import axios from "axios"
import { BACKEND_BASE_URL } from "../../env"
import { TodoRequest } from "../../model/todo.model"
import { CREATE_TODO_BEGIN, CREATE_TODO_FAILED, CREATE_TODO_SUCCESS, DELETE_TODO_BEGIN, FETCH_TODO_BEGIN, FETCH_TODO_FAILED, FETCH_TODO_SUCCESS, UPDATE_TODO_BEGIN, UPDATE_TODO_FALIED, UPDATE_TODO_SUCCESS } from "./todo.action.type"

export const createTodoBegin = () => {
    return {
        type: CREATE_TODO_BEGIN
    }
}

export const createTodoSuccess = (todo: any) => {
    return {
        type: CREATE_TODO_SUCCESS,
        payload: todo
    }
}

export const createTodoFailed = (err: any) => {
    return {
        type: CREATE_TODO_FAILED,
        payload: err
    }
}
export const createTodoAction = (todoReq?: TodoRequest) => {
    return (dispatch: any) => {
        dispatch(createTodoBegin())
        axios.post(`${BACKEND_BASE_URL}/api/todos`, todoReq).then(response => {
            dispatch(createTodoSuccess(response.data))
        }).catch(err => {
            dispatch(createTodoSuccess(err))
        })
    }
}

export const updateTodoBegin = () => {
    return {
        type: UPDATE_TODO_BEGIN
    }
}


export const updateTodoSuccess = (todo: any) => {
    return {
        type: UPDATE_TODO_SUCCESS,
        payload: todo
    }
}


export const updateTodoFailed = (err: any) => {
    return {
        type: UPDATE_TODO_FALIED,
        payload: err
    }
}
export const updateTodoAction = (todoId?: string, todoReq?: TodoRequest) => {
    return (dispatch: any) => {
        dispatch(updateTodoBegin())
        axios.put(`${BACKEND_BASE_URL}/api/todos/${todoId}`, todoReq).then(response => {
            dispatch(updateTodoSuccess(response.data))
        }).catch(err => {
            dispatch(updateTodoFailed(err))
        })
    }
}

export const deleteToDoBegin = () => {
    return {
        type: DELETE_TODO_BEGIN
    }
}
export const deleteToDoSuccess = (todoId: any) => {
    return {
        type: DELETE_TODO_BEGIN,
        payload: todoId
    }
}
export const deleteToDoFailed= (err: any) => {
    return {
        type: DELETE_TODO_BEGIN,
        payload: err
    }
}
export const deleteTodoAction = (todoId: string) => {
    return (dispatch: any) => {
        dispatch(deleteToDoBegin())
        axios.delete(`${BACKEND_BASE_URL}/api/todos/${todoId}`).then(response => {
            dispatch(deleteToDoSuccess(todoId))
        }).catch(err => {
            dispatch(deleteToDoFailed(err))
        })
    }
}
export const fetchTodoBegin = () => {
    return {
        type: FETCH_TODO_BEGIN
    }
}
export const fetchTodoSuccess = (todoList: any) => {
    return {
        type: FETCH_TODO_SUCCESS,
        payload: todoList
    }
}
export const fetchTodoFailed = (err: any) => {
    return {
        type: FETCH_TODO_FAILED,
        payload: err
    }
}
export const fetchTodoAction = () => {
    return (dispatch: any) => {
        dispatch(fetchTodoBegin())
        axios.get(`${BACKEND_BASE_URL}/api/todos`).then(response => {
            dispatch(fetchTodoSuccess(response.data))
        }).catch(err => {
            dispatch(fetchTodoFailed(err))
        })
    }
}
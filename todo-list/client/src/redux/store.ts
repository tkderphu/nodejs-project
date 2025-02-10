import {combineReducers,createStore, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import { createTodoReducer, deleteTodoReducer, fetchTodoReducer, updateTodoReducer } from './todo/todo.reducer'
const combinationReducer =  combineReducers({
    fetchTodo: fetchTodoReducer,
    createTodo: createTodoReducer,
    updateTodo: updateTodoReducer,
    deleteTodo: deleteTodoReducer
})
const store = createStore(combinationReducer, applyMiddleware(thunk))

export default store
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { BACKEND_BASE_URL } from "../env"
import { TodoResponse } from "../model/todo.model"
import { deleteTodoAction, fetchTodoAction } from "../redux/todo/todo.action"

function ListTodoComponent() {

    const res: {
        todos: TodoResponse[],
        error: '',
        hasError: boolean,
        loading: boolean
    } = useSelector((state: any) => {
        return state.fetchTodo
    })

    const deleteRes: {
        error: '',
        hasError: boolean,
        loading: boolean
    } = useSelector((state: any) => {
        return state.deleteTodo
    })

    const dispatch = useDispatch()


    
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchTodoAction())
    }, [])




    const deleteTodo = (todoId: string) => {
        //@ts-ignore
        dispatch(deleteTodoAction(todoId))
    }

    return (
        <div>
            {res.loading && <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>}
            {!res.loading && <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Mã</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Sửa</th>
                        <th scope="col">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {res.todos?.map((todo: any) => {
                        return <tr>
                            <td>{todo._id}</td>
                            <td>{todo.name}</td>
                            <td>{todo.description}</td>
                            <td><Link to={'/update-todo/' + todo._id} className="btn btn-primary">Sửa</Link></td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteTodo(todo._id)}>Xóa</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>}
        </div>
    )
}
export default ListTodoComponent
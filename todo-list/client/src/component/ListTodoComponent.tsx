import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { TodoResponse } from "../model/todo.model"
import { fetchTodoAction } from "../redux/todo/todo.action"

function ListTodoComponent() {

    const todos: TodoResponse[] = []

    useEffect(() => {
        // fetchTodoAction()
    }, [])

    return (
        <table className="table">
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
               {todos?.map(todo => {
                return <tr>
                    <td>{todo.id}</td>
                    <td>{todo.name}</td>
                    <td>{todo.description}</td>
                    <td><button className="btn btn-primary">Sửa</button></td>
                    <td>
                        <button className="btn btn-danger">Xóa</button>
                    </td>
                </tr>
               })}
            </tbody>
        </table>
    )
}
export default ListTodoComponent
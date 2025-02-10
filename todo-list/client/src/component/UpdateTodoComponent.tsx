import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import { BACKEND_BASE_URL } from "../env"
import { TodoRequest, TodoResponse } from "../model/todo.model"
import { updateTodoAction } from "../redux/todo/todo.action"

function UpdateTodoComponent() {
    const {id} = useParams()
    const [todoRequest, setTodoRequest] = useState<TodoRequest>()

    useEffect(() => {
        axios.get(`${BACKEND_BASE_URL}/api/todos/${id}`).then(resp => {
            setTodoRequest({...resp.data})
        });
    }, [id])

    const setState = (e: any) => {
        const {name, value} = e.target
        setTodoRequest(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const updateTodo = () => {
        updateTodoAction(id, todoRequest)
    }

    return (
        <form>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Tên công việc</label>
                <input type="text" className="form-control" 
                    value={todoRequest?.name}
                    onChange={setState}
                id="exampleInputPassword1" placeholder="Tên công việc" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Mô tả</label>
                <input type="text" className="form-control" 
                    onChange={setState}
                value={todoRequest?.description}
                id="exampleInputPassword1" placeholder="Mô tả" />
            </div>
            <button type="submit" onClick={updateTodo} className="btn btn-primary">Submit</button>
        </form>
    )
}
export default UpdateTodoComponent
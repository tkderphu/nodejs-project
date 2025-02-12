import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import { BACKEND_BASE_URL } from "../env"
import { TodoRequest, TodoResponse } from "../model/todo.model"
import { updateTodoAction } from "../redux/todo/todo.action"
import { useDispatch, useSelector } from "react-redux"

function UpdateTodoComponent() {
    const { id } = useParams()
    const [todoRequest, setTodoRequest] = useState<TodoRequest>()

    useEffect(() => {
        axios.get(`${BACKEND_BASE_URL}/api/todos/${id}`).then(resp => {
            const res: TodoResponse = resp.data
            setTodoRequest({ name: res.name, description: res.description })
        });
    }, [id])

    const setState = (e: any) => {
        const { name, value } = e.target
        setTodoRequest(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const dispatch = useDispatch()
    const loading = useSelector((state: any) => {
        return state.updateTodo.loading
    })
    const updateTodo = () => {
        //@ts-ignore
        dispatch(updateTodoAction(id, todoRequest))
    }

    return (
        <div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Tên công việc</label>
                <input type="text" className="form-control"
                    value={todoRequest?.name}
                    name='name'
                    onChange={setState}
                    id="exampleInputPassword1" placeholder="Tên công việc" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Mô tả</label>
                <input type="text" className="form-control"
                    name="description"
                    onChange={setState}
                    value={todoRequest?.description}
                    id="exampleInputPassword1" placeholder="Mô tả" />
            </div>
            <button type="submit" onClick={updateTodo} className="btn btn-primary">Submit</button>
           
            <br></br>
            {loading && <div className="mt-3 spinner-border" role="status">
                
                </div>}

        </div>
    )
}
export default UpdateTodoComponent
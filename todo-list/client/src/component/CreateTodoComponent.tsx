import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TodoRequest } from "../model/todo.model"
import { createTodoAction } from "../redux/todo/todo.action"

function CreateTodoComponent() {
    const [todoRequest, setTodoRequest] = useState<TodoRequest>()
    const setState = (e: any) => {
        const { name, value } = e.target
        setTodoRequest(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const loading = useSelector((state: any) => {
        return state.createTodo.loading
    })

    const dispatch = useDispatch()
    const createTodo = () => {
        //@ts-ignore
        dispatch(createTodoAction(todoRequest))

        console.log("ok")
    }
    return (
        <div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Tên công việc</label>
                <input type="text" className="form-control"
                    onChange={setState} name='name'
                    id="exampleInputPassword1" placeholder="Tên công việc" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword2">Mô tả</label>
                <input type="text" name='description'
                    onChange={setState}
                    className="form-control" id="exampleInputPassword2" placeholder="Mô tả" />
            </div>
            <button type="submit" onClick={createTodo} className="btn btn-primary">Submit</button>
            <br />
            {loading && <div className="mt-3 spinner-border" role="status">
            </div>}
        </div>
    )
}
export default CreateTodoComponent
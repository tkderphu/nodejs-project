import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HeaderComponent from './component/HeaderComponent'
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import ListTodoComponent from './component/ListTodoComponent'
import CreateTodoComponent from './component/CreateTodoComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className='container'>
    <HeaderComponent></HeaderComponent>
      <Routes>
        <Route path='list' element={<ListTodoComponent/>}></Route>
        <Route path='create-todo' element={<CreateTodoComponent/>}></Route>
        <Route path='update-todo/:id' element={<CreateTodoComponent/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App

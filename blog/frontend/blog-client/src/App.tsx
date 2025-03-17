import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './component/header/Header'
import Home from './component/home/Home'
import Login from './component/login/Login'
import Register from './component/register/Register'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './component/Layout'
import {Provider} from 'react-redux'
import store from './redux/store'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          {/* <Header/> */}
          <Provider store={store}>
          <BrowserRouter>
            <Layout/>
          </BrowserRouter>
          </Provider>
    </>
  )
}

export default App

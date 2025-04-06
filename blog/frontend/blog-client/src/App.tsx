import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './component/Layout'
import {Provider} from 'react-redux'
import store from './redux/store'
import { firebaseListenerForMessages, getFcmToken } from './firebase/firebase.config'
import { getUserLoggined } from './service/AuthenLoginResponse'
function App() {
  const [fmToken, setFmToken] = useState<string>()

  useEffect(() => {
    console.log("-------toke fm=-=----")
    getFcmToken(getUserLoggined()._id).then(token => {
        console.log("0----")
        console.log("token: ", token)
        firebaseListenerForMessages()
        setFmToken(token)
    })
  }, [fmToken])

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

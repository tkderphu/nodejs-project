import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './component/Layout'
import { Provider } from 'react-redux'
import store from './redux/store'

import socket from './socket/socket';
import { getUserLoggined } from './service/AuthenLoginResponse'

function App() {


  // useEffect(() => {
  //   // getFcmToken(getUserLoggined()._id).then(token => {
  //   //     firebaseListenerForMessages()
  //   //     setFmToken(token)
  //   // })
  //   if (getUserLoggined()._id) {
  //     socket.on(`/payment/${getUserLoggined()._id}`, (data: string) => {
  //     });

  //     return () => {
  //       socket.off('receive_message');
  //     };
  //   }
  // }, [getUserLoggined()._id])





  return (
    <>

      {/* <Header/> */}
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './component/Layout'
import { Provider } from 'react-redux'
import store from './redux/store'
import ToastApp from './component/common/toast/Toast'
import Toast from './component/common/toast/Toast'
import NotifyFollowTemplate from './component/notification/template/NotifyFollowTemplate'
import PlayAudio from './sound/PlayAudio'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { getUserLoggined } from './service/AuthenLoginResponse'
import socket from './socket/socket'

function App() {

  useEffect(() => {
    if (getUserLoggined()._id) {

      socket.on(`topic_notification_user_${getUserLoggined()._id}`, (data) => {
        const msg: {
          _id: string,
          createdAt: Date,
          notifyType: "COMMENT" | "POST" | "FOLLOW" | "REPLY_COMMENT",
          params: any,
          userMessages: {
            read: boolean
          }
        } = data

        toast.success(<>
          <NotifyFollowTemplate params={msg.params} read={msg.userMessages.read} time={"2w"} />
          <PlayAudio uuid={new Date().getTime() + ""} />
        </>, {
          icon: false
        })

      });

      return () => {
        socket.off(`topic_notification_user_${getUserLoggined()._id}`);
      };
    }
  }, [getUserLoggined()._id])


  return (
    <>
      {/* <Header/> */}
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
          {/* <ToastApp/> */}
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App

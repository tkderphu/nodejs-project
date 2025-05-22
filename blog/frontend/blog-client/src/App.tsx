import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './component/Layout'
import { Provider } from 'react-redux'
import store from './redux/store'
import ToastApp from './component/common/toast/Toast'
import Toast from './component/common/toast/Toast'
import NotifyFollowTemplate from './component/notification/template/NotifyFollowTemplate'
import PlayAudio from './sound/PlayAudio'


function App() {




  return (
    <>

      {/* <Header/> */}
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
          <ToastApp/>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App

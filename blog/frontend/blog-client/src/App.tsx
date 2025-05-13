import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './component/Layout'
import { Provider } from 'react-redux'
import store from './redux/store'


function App() {




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

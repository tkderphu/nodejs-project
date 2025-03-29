import { Route, Routes, useLocation } from "react-router-dom";
import Post from "./post/PostSimple";
import ForgetPassword from "./forget-password/ForgetPassword";
import Header from "./header/Header";
import Home from "./home/Home";
import Login from "./login/Login";
import PostCreate from "./post/PostCreate";
import Profile from "./profile/Profile";
import Register from "./register/Register";
import PostDetail from "./post/PostDetail";

function Layout() {
    const location = useLocation();
    const hideNavbarRoutes = ["/login", "/register", "/forgot-password"];
  
    return (
      <div>
        {!hideNavbarRoutes.includes(location.pathname) && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element={<ForgetPassword/> }/>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path='/create-post' element={<PostCreate/>}></Route>
          <Route path="/posts/:id/:name" element={<PostDetail/>}></Route>
        </Routes>
      </div>
    );
  }

export default Layout
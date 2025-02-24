import { Route, Routes, useLocation } from "react-router-dom";
import ForgetPassword from "./forget-password/ForgetPassword";
import Header from "./Header";
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./register/Register";

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
        </Routes>
      </div>
    );
  }

export default Layout
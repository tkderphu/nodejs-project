import { Navigate, Outlet } from "react-router-dom";
import { getRefreshToken, getToken, getUserLoggined } from "../../service/AuthenLoginResponse";

export default function ProtectedComponent() {
    if(!getToken()) {
        return <Navigate to={"/login"} ></Navigate>
    }
    return <Outlet/>
}
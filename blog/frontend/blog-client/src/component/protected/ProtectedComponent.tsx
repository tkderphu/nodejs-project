import { Navigate, Outlet } from "react-router-dom";
import { getRefreshToken, getToken, getUserLoggined } from "../../service/AuthenLoginResponse";

export default function ProtectedComponent({role}: any) {
    if(role && role != getUserLoggined().role) {
        return <Navigate to={"/admin/login"} />
    }
    if(!getToken()) {
        return <Navigate to={"/login"} ></Navigate>
    }
    return <Outlet/>
}
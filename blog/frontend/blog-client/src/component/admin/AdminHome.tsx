import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import "./AdminHome.css"
import AdminHomeOverview from "./AdminHomeOverview"
import AdminHomeReport from "./AdminHomeReport"
import AdminHomeUserManagement from "./AdminHomeUserManagement"
const NAV = [
    {
        name: "Bảng điều khiển",
        path: "panel",
        icon: "fas fa-tachometer-alt"
    },
    {
        name: "Quản lý người dùng",
        path: "users",
        icon: "fas fa-users"
    },
    {
        name: "Quản lý tố cáo",
        path: "reports",
        icon: "fas fa-chart-bar"
    }
]
export default function AdminHome() {
    const [useNav, setUserNav] = useState<"panel" | "users" | "reports">("panel")
    
    return (
        <div id="admin-ui">
            {/* Sidebar */}
            <div className="sidebar" id="sidebar">
                <div className="sidebar-header">
                    <h3>
                        <i className="fas fa-user-shield" /> Admin Panel
                    </h3>
                </div>
                <div className="sidebar-menu">
                    {NAV.map(nav => {
                        return (
                            <Link onClick={() => setUserNav(nav.path)}  to={nav.path} className={`menu-item ${nav.path === useNav ? "active" : ""}`} >
                                <i className={nav.icon} />
                                <span>{nav.name}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
            {/* Main Content */}
            <div className="main-content" id="mainContent">
                {/* Top Bar */}
                <div className="topbar">
                    <button className="toggle-btn" >
                        <i className="fas fa-bars" />
                    </button>
                    {/* <div className="search-box">
                        <i className="fas fa-search" />
                        <input type="text" className="form-control" placeholder="Search..." />
                    </div> */}
                    <div className="user-info">
                        <span className="me-3">Welcome, Admin</span>
                        <div className="dropdown d-inline-block">
                            <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                <i className="fas fa-user" />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-user-edit me-2" />
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-sign-out-alt me-2" />
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Content Area */}
                <div className="content-area">
                    <div className="container-fluid">
                        {/* Dashboard Section */}
                        {/* <AdminHomeOverview /> */}
                        {/* User Management Section */}
                        {/* <AdminHomeUserManagement /> */}
                        {/* Report Management Section */}
                        {/* <AdminHomeReport /> */}
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>

    )
}
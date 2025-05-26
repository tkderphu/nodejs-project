import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
const NAV = [
    {
        name: "Bài viết bị tố cáo",
        icon: "fas fa-file-alt me-2",
        path: "post"
    },
    {
        name: "Bình luận bị tố cáo",
        path: "comment",
        icon: "fas fa-comments me-2"
    }
]
export default function AdminHomeReport() {
    const [useNav, setUseNav] = useState<"post" | "comment">("post")
    return (
        <div
            id="reports-section"
            className="content-section"
        >
            <div className="row">
                <div className="col-12">
                    {/* Navigation Tabs */}
                    <ul className="nav nav-tabs" id="reportTabs" role="tablist">
                        {NAV.map(nav => {
                            return (
                                <li className="nav-item" role="presentation">
                                    <Link to={nav.path}
                                        onClick={() => setUseNav(nav.path)}
                                        className={`nav-link ${nav.path === useNav ? "active" : ""}`}
                                        id="posts-tab"
                                        
                                    >
                                        <i className={nav.icon} />
                                       {nav.name}
                                    </Link>
                                </li>
                            )
                        })}

                    </ul>
                    {/* Tab Content */}
                    <div className="tab-content" id="reportTabContent">
                        {/* Post Reports */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
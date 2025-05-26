export default function AdminHomeOverview() {
    return (
        <div id="dashboard-section" className="content-section">
            <div className="row">
                <div className="col-12">
                    <h2 className="page-title">Trang điều khiển</h2>
                </div>
            </div>
            <div className="row g-4">
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                    <div className="stats-card-admin">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h4>1,245</h4>
                                <p>Người dùng</p>
                            </div>
                            <div className="col-4 text-end">
                                <i
                                    className="fas fa-users"
                                    style={{ fontSize: "2rem", opacity: "0.7" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                    <div className="stats-card-admin">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h4>852</h4>
                                <p>Bài viết</p>
                            </div>
                            <div className="col-4 text-end">
                                <i
                                    className="fas fa-file-alt"
                                    style={{ fontSize: "2rem", opacity: "0.7" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                    <div className="stats-card-admin">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h4>3,642</h4>
                                <p>Bình luận</p>
                            </div>
                            <div className="col-4 text-end">
                                <i
                                    className="fas fa-comments"
                                    style={{ fontSize: "2rem", opacity: "0.7" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                    <div className="stats-card-admin">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h4>24</h4>
                                <p>Tố cáo</p>
                            </div>
                            <div className="col-4 text-end">
                                <i
                                    className="fas fa-exclamation-triangle"
                                    style={{ fontSize: "2rem", opacity: "0.7" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
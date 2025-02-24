
import "./Home.css"
function Home() {
    return (
        <>
           
            <div className="container-fluid bg-dark text-white text-center py-4">
                <h2>VIBLO AWARDS 2024</h2>
                <h4>LEARNER OF THE YEAR 2024</h4>
            </div>


            <div className="container mt-3">
                <ul className="nav nav-tabs">
                    <li className="nav-item"><a className="nav-link active" href="#">MỚI NHẤT</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">EDITORS' CHOICE</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">TRENDING</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">VIDEOS</a></li>
                </ul>
            </div>

            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body d-flex">
                                <img src="author1.jpg" alt="Author Image" className="rounded-circle me-3" width="50" />
                                <div>
                                    <h5 className="card-title">Khảo sát Viblo: Nhu cầu phát triển sự nghiệp IT toàn cầu</h5>
                                    <p className="card-text text-muted">Viblo Announcer - 2 phút đọc</p>
                                    <p className="text-muted">
                                        <button style={{border: 'none', backgroundColor:'white'}} data-toggle="tooltip" data-placement="top" title="Số lượng người xem">👁️ 10</button>
                                     <span>💬 0</span> 
                                     <span>🔖 0</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body d-flex">
                                <img src="author2.jpg" alt="Author Image" className="rounded-circle me-3" width="50" />
                                <div>
                                    <h5 className="card-title">PushbackInputSteam trong Java nó tiện lợi như thế nào?</h5>
                                    <p className="card-text text-muted">Sang Le - 7 phút đọc</p>
                                    <p className="text-muted"><span>👁️ 10</span> <span>💬 0</span> <span>🔖 0</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-body d-flex">
                                <img src="author2.jpg" alt="Author Image" className="rounded-circle me-3" width="50" />
                                <div>
                                    <h5 className="card-title">PushbackInputSteam trong Java nó tiện lợi như thế nào?</h5>
                                    <p className="card-text text-muted">Sang Le - 7 phút đọc</p>
                                    <p className="text-muted"><span>👁️ 10</span> <span>💬 0</span> <span>🔖 0</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body d-flex">
                                <img src="author2.jpg" alt="Author Image" className="rounded-circle me-3" width="50" />
                                <div>
                                    <h5 className="card-title">PushbackInputSteam trong Java nó tiện lợi như thế nào?</h5>
                                    <p className="card-text text-muted">Sang Le - 7 phút đọc</p>
                                    <p className="text-muted"><span>👁️ 10</span> <span>💬 0</span> <span>🔖 0</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body d-flex">
                                <img src="author2.jpg" alt="Author Image" className="rounded-circle me-3" width="50" />
                                <div>
                                    <h5 className="card-title">PushbackInputSteam trong Java nó tiện lợi như thế nào?</h5>
                                    <p className="card-text text-muted">Sang Le - 7 phút đọc</p>
                                    <p className="text-muted"><span>👁️ 10</span> <span>💬 0</span> <span>🔖 0</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body d-flex">
                                <img src="author2.jpg" alt="Author Image" className="rounded-circle me-3" width="50" />
                                <div>
                                    <h5 className="card-title">PushbackInputSteam trong Java nó tiện lợi như thế nào?</h5>
                                    <p className="card-text text-muted">Sang Le - 7 phút đọc</p>
                                    <p className="text-muted"><span>👁️ 10</span> <span>💬 0</span> <span>🔖 0</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 sticky-sidebar">
                        <h5 className="text-primary">Câu Hỏi Mới Nhất</h5>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>Phúc Nguyễn Minh Thiên:</strong> AI hỗ trợ duyệt dự án trên website?<br />
                                <span className="text-muted">👁️ 114 💬 0 ⭐ 1</span>
                            </li>
                            <li className="list-group-item">
                                <strong>Lê Thanh:</strong> Làm sao hiện menu Group cho khách?<br />
                                <span className="text-muted">👁️ 45 💬 0 ⭐ 1</span>
                            </li>
                        </ul>


                        <h5 className="text-primary mt-4">Tác Giả Hàng Đầu</h5>
                        <ul className="list-group">
                            <li className="list-group-item d-flex align-items-center">
                                <img src="top_author1.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
                                <div>
                                    <span>Nguyễn Văn A</span><br />
                                    <small className="text-muted">👁️ 5000 | ⭐ 150 | 📝 200 | 👥 300 | 📈 10000</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <img src="top_author2.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
                                <div>
                                    <span>Trần Thị B</span><br />
                                    <small className="text-muted">👁️ 4000 | ⭐ 120 | 📝 180 | 👥 250 | 📈 9000</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <img src="top_author3.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
                                <div>
                                    <span>Lê Công C</span><br />
                                    <small className="text-muted">👁️ 3500 | ⭐ 100 | 📝 160 | 👥 200 | 📈 8500</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <img src="top_author3.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
                                <div>
                                    <span>Lê Công C</span><br />
                                    <small className="text-muted">👁️ 3500 | ⭐ 100 | 📝 160 | 👥 200 | 📈 8500</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <img src="top_author3.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
                                <div>
                                    <span>Lê Công C</span><br />
                                    <small className="text-muted">👁️ 3500 | ⭐ 100 | 📝 160 | 👥 200 | 📈 8500</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <img src="top_author3.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
                                <div>
                                    <span>Lê Công C</span><br />
                                    <small className="text-muted">👁️ 3500 | ⭐ 100 | 📝 160 | 👥 200 | 📈 8500</small>
                                </div>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                                <img src="top_author3.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
                                <div>
                                    <span>Lê Công C</span><br />
                                    <small className="text-muted">👁️ 3500 | ⭐ 100 | 📝 160 | 👥 200 | 📈 8500</small>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
export default function Footer() {
    return (
        <div className="d-flex flex-column">
            <div className="flex-grow-1"></div> {/* pushes footer to bottom when content is short */}

            <footer className="bg-dark text-white py-4 mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <h5>VIOSMASH</h5>
                            <p>Nền tảng chia sẻ kiến thức công nghệ hàng đầu Việt Nam.</p>
                            <div className="social-icons">
                                <a href="#" className="text-white me-2"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="text-white me-2"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="text-white me-2"><i className="fab fa-linkedin-in"></i></a>
                                <a href="#" className="text-white me-2"><i className="fab fa-github"></i></a>
                            </div>
                        </div>
                        <div className="col-md-2 mb-3">
                            <h5>Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white">Trang chủ</a></li>
                                <li><a href="#" className="text-white">Bài viết</a></li>
                                <li><a href="#" className="text-white">Series</a></li>
                                <li><a href="#" className="text-white">Tác giả</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2 mb-3">
                            <h5>Danh mục</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white">Machine Learning</a></li>
                                <li><a href="#" className="text-white">Web Development</a></li>
                                <li><a href="#" className="text-white">Mobile</a></li>
                                <li><a href="#" className="text-white">DevOps</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Liên hệ</h5>
                            <p><i className="fas fa-envelope me-2"></i>contact@viosmash.com</p>
                            <p><i className="fas fa-phone me-2"></i>+84 123 456 789</p>
                            <p><i className="fas fa-map-marker-alt me-2"></i>TP Hồ Chí Minh, Việt Nam</p>
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div className="text-center">
                        <p className="mb-0">© 2025 VIOSMASH. Tất cả các quyền được bảo lưu.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

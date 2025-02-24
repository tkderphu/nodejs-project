
function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <a className="navbar-brand" href="#">VIBLO</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
                <li className="nav-item"><a className="nav-link" href="#">Bài Viết</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Hỏi Đáp</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Thảo Luận</a></li>
            </ul>
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Tìm kiếm trên Viblo" />
                <button className="btn btn-outline-primary" type="submit">🔍</button>
            </form>
            <a href={`/login?continue=${location.href}`} className="btn btn-outline-secondary ms-3">Đăng nhập/Đăng ký</a>
        </div>
    </nav>
    )
}
export default Header
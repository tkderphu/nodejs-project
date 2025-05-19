import "./Author.css"
export default function AuthorInfo() {
    return (
        <div className="d-flex align-items-center mb-3">
            {/* Profile Image */}
            <div className="me-3">
                <img
                    src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ0iAUKNcZnuawtwzQTmV6-hJdXknAgLwaSDl58Pt5lQWZCoxaSw8vvrsTeO323M2FMmMxipltIdOzBGLUlL9oQhWXS4IV_168nWOj_xw"
                    alt="Profile Image"
                    className="profile-img"
                />
            </div>
            <div className="d-flex flex-column align-items-start">
                {/* Name and Username */}
                <div className="author-name">Mai Trung Đức</div>
                <div className="stats">
                    <div className="stat-item">
                        <i className="far fa-star" />
                        <span>49.0K</span>
                    </div>
                    <div className="stat-item">
                        <i className="fas fa-user-friends" />
                        <span>2.6K</span>
                    </div>
                    <div className="stat-item">
                        <i className="fas fa-pen" />
                        <span>88</span>
                    </div>
                </div>
                {/* Follow Button */}
                <button className="btn btn-outline-primary btn-follow">
                    <i className="fas fa-plus me-1" />
                    Follow
                </button>
            </div>
        </div>
    )
}
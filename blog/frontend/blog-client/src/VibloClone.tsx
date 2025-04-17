import React from "react";

const posts = [
  {
    user: "Viblo Announcer",
    time: "Mar 18th, 8:00 p.m.",
    readTime: "2 min read",
    title: "VIBLO MOBILE APP CHÍNH THỨC RA MẮT – TRẢI NGHIỆM NGAY VÀ THAM GIA MINIGAME HẤP DẪN!",
    pinned: true,
    type: "Announcement",
    views: 0,
    likes: 0,
    comments: 0,
  },
  {
    user: "EngineerPro",
    time: "about 1 hour ago",
    readTime: "9 min read",
    title: "“MỘT TIN NHẮN BẤT NGỜ, MỘT HÀNH TRÌNH ĐÁNG NHỚ”",
    tags: ["account facebook", "AI", "android", "angular", "Auto testing"],
    views: 4,
    likes: 0,
    comments: 0,
  },
  {
    user: "CometAPI",
    time: "about 4 hours ago",
    readTime: "4 min read",
    title: "GPT-4o: How Many Images Can You Generate?",
    tags: ["cometapi"],
    views: 9,
    likes: 0,
    comments: 0,
  },
  {
    user: "CometAPI",
    time: "about 5 hours ago",
    readTime: "4 min read",
    title: "Google A2A vs Anthropic MCP: Competing or Complementary?",
    tags: ["cometapi"],
    views: 8,
    likes: 0,
    comments: 0,
  },
  {
    user: "Nguyễn Trọng Quân",
    time: "about 5 hours ago",
    readTime: "6 min read",
    title: "Bài 2: Pre-migrate",
    tags: ["Cloud", "DevOps", "Migrate"],
    views: 15,
    likes: 0,
    comments: 0,
  },
];

export default function VibloClone() {
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Main content */}
        <div className="col-md-9">
          {posts.map((post, idx) => (
            <div className="card mb-3" key={idx}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="text-primary fw-bold">{post.user}</div>
                  <div className="text-muted small">
                    {post.time} ・ {post.readTime}
                  </div>
                </div>
                <h6 className="mt-2">
                  <a href="#" className="text-decoration-none">
                    {post.title}
                  </a>
                  {post.pinned && <i className="fas fa-thumbtack text-primary ms-2"></i>}
                </h6>
                {post.type && <span className="badge bg-primary">{post.type}</span>}
                <div className="mt-2">
                  {post.tags &&
                    post.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="badge bg-secondary me-1"
                      >
                        @{tag}
                      </span>
                    ))}
                </div>
                <div className="mt-2 d-flex align-items-center text-muted small">
                  <div className="me-3">
                    <i className="fas fa-eye me-1"></i>
                    {post.views}
                  </div>
                  <div className="me-3">
                    <i className="fas fa-heart me-1"></i>
                    {post.likes}
                  </div>
                  <div>
                    <i className="fas fa-comment me-1"></i>
                    {post.comments}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="col-md-3">
          <h6 className="fw-bold">NEWEST QUESTIONS</h6>
          <ul className="list-unstyled small">
            <li className="mb-2">
              <a href="#" className="text-decoration-none">
                Học lập trình web trong bao lâu thì có thể đi làm
              </a>
              <div className="text-muted">
                👁 1 💬 0 ❤️ 0 — Duy Trần
              </div>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none">
                Có nhất thiết phải dùng trình quản lý mật khẩu k?
              </a>
              <div className="text-muted">
                👁 8 💬 1 ❤️ 8 — Trương Kiên
              </div>
            </li>
            <li>
              <a href="#" className="text-decoration-none">
                Thiết kế Database để lưu dữ liệu từ EditText (FE) xuống DB(BE)
              </a>
              <div className="text-muted">
                👁 239 💬 0 ❤️ 1 — Phúc Nguyễn Minh Thiên
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
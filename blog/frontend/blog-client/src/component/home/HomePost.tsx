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
export default function HomePost() {
    return (
        <>
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
        </>
    )
}
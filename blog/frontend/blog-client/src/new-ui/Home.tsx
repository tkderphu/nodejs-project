import React, { useState, useEffect } from 'react';
import { Moon, Sun, Search, Bell, List, BookOpen, Star, Eye, Heart, MessageSquare, Bookmark, Award } from 'lucide-react';

// Color generation utility
const generateTagColors = (tagText: any) => {
  // Color palettes (Bootstrap colors)
  const backgrounds = [
    '#e3f2fd', '#d1e7dd', '#fff3cd', '#f8d7da', '#cff4fc', '#e2e3e5',
    '#f2e7fe', '#fce7f3', '#ecfdf5', '#eff6ff', '#f7fee7', '#fef9c3'
  ];
  const textColors = [
    '#0d6efd', '#198754', '#ffc107', '#dc3545', '#0dcaf0', '#6c757d',
    '#7e22ce', '#db2777', '#059669', '#3b82f6', '#65a30d', '#ca8a04'
  ];
  
  // Generate a consistent index based on tag text
  let hashCode = 0;
  for (let i = 0; i < tagText.length; i++) {
    hashCode = tagText.charCodeAt(i) + ((hashCode << 5) - hashCode);
  }
  
  // Get positive index for our color arrays
  const index = Math.abs(hashCode) % backgrounds.length;
  
  return {
    backgroundColor: backgrounds[index],
    color: textColors[index]
  };
};

// Tag Component
const Tag = ({ text }: any) => {
  const tagStyle = generateTagColors(text);
  
  return (
    <span 
      className="rounded-full px-3 py-1 text-xs font-medium mr-2 mb-2 inline-block"
      style={tagStyle}
    >
      {text}
    </span>
  );
};

// Post Card Component
const PostCard = ({ post, featured }: any) => {
  return (
    <div className="card mb-4 transition-transform duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md rounded-xl overflow-hidden">
      <div className="card-body relative">
        {featured && (
          <span className="absolute top-2 right-2 bg-blue-500 bg-opacity-85 text-white rounded-full px-3 py-1 text-xs font-medium">
            <Star className="inline mr-1 w-4 h-4" /> Featured
          </span>
        )}
        
        <div className="flex items-center mb-3">
          <img src="/api/placeholder/40/40" className="w-10 h-10 rounded-full object-cover mr-2" alt="Author" />
          <div>
            <h6 className="mb-0 font-medium">{post.author}</h6>
            <small className="text-gray-500">{post.date} · {post.readTime} min read</small>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-3">{post.description}</p>
        
        <div className="mb-3">
          {post.tags.map((tag: any, index: any) => (
            <Tag key={index} text={tag} />
          ))}
        </div>
        
        <div className="text-gray-500 text-sm">
          <span className="mr-3"><Eye className="inline w-4 h-4 mr-1" /> {post.views}</span>
          <span className="mr-3"><Heart className="inline w-4 h-4 mr-1" /> {post.likes}</span>
          <span className="mr-3"><MessageSquare className="inline w-4 h-4 mr-1" /> {post.comments}</span>
          <span><Bookmark className="inline w-4 h-4 mr-1" /> {post.bookmarks}</span>
        </div>
      </div>
    </div>
  );
};

// Top Author Component
const TopAuthor = ({ author }: any) => {
  return (
    <div className="border-l-4 border-blue-500 p-3 mb-3 bg-white rounded shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/api/placeholder/40/40" className="w-10 h-10 rounded-full object-cover mr-3" alt="Author" />
          <div>
            <h6 className="mb-0 font-medium">{author.name}</h6>
            <div className="text-gray-500 text-sm">
              <i className="text-blue-500 mr-1">✏️</i> {author.posts} bài viết
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex">
            <span className="mr-2 text-sm"><Star className="inline w-4 h-4 text-yellow-400" /> {author.stars}</span>
            <span className="text-sm"><Heart className="inline w-4 h-4 text-red-400" /> {author.hearts}</span>
          </div>
          <small>{author.reviews} đánh giá</small>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const ViosmashBlog = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Sample data - would come from your API in a real app
  const posts = [
    {
      id: 1,
      author: "PHU NGUYEN",
      date: "2025-05-11T05:12:55.308Z",
      readTime: 6,
      title: "Cách đo lường Bias và Variance bằng Bootstrap",
      description: "Hiểu về bias và variance trong machine learning và cách sử dụng bootstrap để đo lường chúng một cách hiệu quả.",
      tags: ["ai", "machine learning", "python"],
      views: 0,
      likes: 0,
      comments: 0,
      bookmarks: 0
    },
    {
      id: 2,
      author: "PHU NGUYEN",
      date: "2025-05-11T05:03:11.245Z",
      readTime: 6,
      title: "Tìm hiểu về json web token (JWT)",
      description: "Khám phá cách thức hoạt động của JWT và cách áp dụng chúng trong xác thực người dùng.",
      tags: ["jwt", "web", "security"],
      views: 0,
      likes: 0,
      comments: 0,
      bookmarks: 0
    },
    {
      id: 3,
      author: "PHU NGUYEN",
      date: "2025-04-18T23:30:37.819Z",
      readTime: 6,
      title: "Test again",
      description: "Bài viết về back-end development với các công nghệ hiện đại.",
      tags: ["java", "spring", "mongodb", "mysql", "docker"],
      views: 0,
      likes: 0,
      comments: 0,
      bookmarks: 0
    }
  ];
  
  const topAuthors = [
    {
      id: 1,
      name: "Trần Thị B",
      posts: 4000,
      stars: 120,
      hearts: 180,
      reviews: 9000
    },
    {
      id: 2,
      name: "Lê Công C",
      posts: 3500,
      stars: 100,
      hearts: 160,
      reviews: 8500
    },
    {
      id: 3,
      name: "Lê Công C",
      posts: 3500,
      stars: 100,
      hearts: 160,
      reviews: 8500
    }
  ];
  
  const popularTags = [
    "machine learning", "python", "java", "web", "security", 
    "ai", "javascript", "reactjs", "nodejs", "database", "cloud", "devops"
  ];
  
  // Toggle dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-gray-900', 'text-white');
    } else {
      document.body.classList.remove('bg-gray-900', 'text-white');
    }
    
    return () => {
      document.body.classList.remove('bg-gray-900', 'text-white');
    };
  }, [darkMode]);
  
  return (
    <div className={darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}>
      {/* Navigation Bar */}
      <nav className={`navbar navbar-expand-lg sticky-top shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container">
          <a className={`navbar-brand text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`} href="#">VIOSMASH</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={`nav-link active ${darkMode ? 'text-white' : ''}`} href="#">Bài viết</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${darkMode ? 'text-white' : ''}`} href="#">Đang theo dõi</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${darkMode ? 'text-white' : ''}`} href="#">Bookmark của tôi</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${darkMode ? 'text-white' : ''}`} href="#">Series</a>
              </li>
            </ul>
            <form className="d-flex me-3">
              <div className="input-group">
                <input className="form-control" type="search" placeholder="Tìm kiếm bài viết" />
                <button className="btn btn-outline-primary" type="submit">
                  <Search size={18} />
                </button>
              </div>
            </form>
            <div className="d-flex align-items-center">
              <button 
                className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-secondary'} me-2`}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-secondary'} position-relative me-2`}>
                <Bell size={18} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  6+
                </span>
              </button>
              <div className="dropdown">
                <button className="btn btn-outline-primary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown">
                  Fuu Nguyen
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#">Trang cá nhân</a></li>
                  <li><a className="dropdown-item" href="#">Cài đặt</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Đăng xuất</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-4 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-5 fw-bold">VIOSMASH Tech Blog</h1>
              <p className="lead">Chia sẻ kiến thức về công nghệ, lập trình và machine learning</p>
            </div>
            <div className="col-md-4 text-end">
              <button className="btn btn-light btn-lg me-2">Viết bài</button>
              <button className="btn btn-outline-light btn-lg">Tạo series</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-4">
        <div className="row">
          {/* Blog Posts Column */}
          <div className="col-lg-8">
            {/* Featured Post */}
            <PostCard post={posts[0]} featured={true} />
            
            {/* Regular Posts */}
            {posts.slice(1).map(post => (
              <PostCard key={post.id} post={post} featured={false} />
            ))}

            {/* Load More Button */}
            <div className="text-center mb-5">
              <button className="btn btn-outline-primary px-4">Xem thêm bài viết</button>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="col-lg-4">
            {/* View Mode Switcher */}
            <div className={`card mb-4 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
              <div className="card-body d-flex justify-content-between">
                <button className="btn btn-primary flex-grow-1 me-2">
                  <List size={18} className="me-1" /> Danh sách
                </button>
                <button className="btn btn-outline-primary flex-grow-1">
                  <BookOpen size={18} className="me-1" /> Đọc
                </button>
              </div>
            </div>

            {/* Top Authors */}
            <div className={`card mb-4 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
              <div className={`card-header ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <h5 className="mb-0">Các tác giả hàng đầu</h5>
              </div>
              <div className="card-body p-3">
                {topAuthors.map(author => (
                  <TopAuthor key={author.id} author={author} />
                ))}
              </div>
              <div className={`card-footer ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} text-center`}>
                <a href="#" className="text-blue-500">Xem tất cả tác giả</a>
              </div>
            </div>

            {/* Popular Tags */}
            <div className={`card mb-4 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
              <div className={`card-header ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <h5 className="mb-0">Tags phổ biến</h5>
              </div>
              <div className="card-body">
                {popularTags.map((tag, index) => (
                  <a key={index} href="#" className="no-underline">
                    <Tag text={tag} />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className={`card mb-4 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
              <div className="card-body">
                <h5 className="card-title">Đăng ký nhận bản tin</h5>
                <p className="card-text">Nhận thông báo về các bài viết mới và thú vị!</p>
                <div className="input-group mb-3">
                  <input type="email" className="form-control" placeholder="Email của bạn" />
                  <button className="btn btn-primary" type="button">Đăng ký</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5>VIOSMASH</h5>
              <p>Nền tảng chia sẻ kiến thức công nghệ hàng đầu Việt Nam.</p>
              <div className="social-icons">
                <a href="#" className="text-white me-2">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white me-2">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white me-2">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="text-white me-2">
                  <i className="fab fa-github"></i>
                </a>
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
};

export default ViosmashBlog;
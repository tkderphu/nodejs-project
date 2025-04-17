import { useEffect } from "react";
import CommentComponent from "../comment/CommentComponent";
import "./Post.css"
export default function PostVeryDetails() {
    useEffect(() => {
        if (location.hash) {
          const id = location.hash.replace('#', '');
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, [location]);


      
    return (
        <>
        <div className="container mt-5 row">
            <div className="col-md-1 d-none d-md-block">
                <div className="position-sticky" style={{ top: "100px" }}>
                    <div className="text-center">
                        <button className="btn btn-light mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                        </svg>                        <div>0</div></button>
                        <button className="btn btn-light mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                            </svg>
                            <div>0</div>
                        </button>
                        <button className="btn btn-light mb-3">A</button>
                        <button className="btn btn-light mb-3">🌐</button>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center mb-3">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="Avatar"
                            className="rounded-circle"
                            width="50"
                            height="50"
                        />
                        <div className="ms-3 d-flex justify-content-between">
                            <div>
                                <strong>Vinh Phạm</strong>
                                <button className="btn btn-sm btn-outline-secondary ms-auto">Follow</button>
                                <br />
                                <div className="d-flex justify-content-around">
                                    <small className="text-muted d-flex align-items-center" style={{ fontSize: "18px" }}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                    </svg><span>24</span></small>
                                    <small className="text-muted d-flex align-items-center" style={{ fontSize: "18px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                        <span>128</span>
                                    </small>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="text-muted mb-2" style={{ position: "relative", right: 0 }}>
                            Đã đăng 9h trước - 2 phút đọc
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </svg> 27
                            💬 0
                            ❤️ 0
                        </div>
                    </div>
                </div>
                <h1 className="fw-bold">Làm chủ useActionState trong React</h1>

                <p>
                    Nếu bạn đang tìm hiểu về React hiện đại — đặc biệt là với React Server Components —
                    thì có một hook mạnh mẽ nhưng ít người biết đến mà bạn nên làm quen:
                    <code className="ms-1">useActionState</code>
                </p>

                <p>
                    Hook này có mặt trong các bản build experimental và Canary của React, và nó mang lại
                    một cách quản lý state liên quan đến form thông minh hơn, được gắn trực tiếp với quá
                    trình gửi form.
                </p>

                <p>
                    Trong bài viết này, chúng ta sẽ phân tích <code>useActionState</code> là gì, lý do tại
                    sao nó hữu ích, và đi qua các ví dụ thực tế để bạn có thể tự tin tích hợp nó vào ứng dụng
                    của mình.
                </p>

                <h3 className="bg-light p-2 rounded mt-4">
                    <strong>useActionState</strong> là gì?
                </h3>

                <p>
                    <code>useActionState</code> là một hook trong React được thiết kế để xử lý việc cập nhật
                    state xảy ra sau khi một form được gửi.
                </p>
                <p>
                    Nếu bạn đang tìm hiểu về React hiện đại — đặc biệt là với React Server Components —
                    thì có một hook mạnh mẽ nhưng ít người biết đến mà bạn nên làm quen:
                    <code className="ms-1">useActionState</code>
                </p>

                <p>
                    Hook này có mặt trong các bản build experimental và Canary của React, và nó mang lại
                    một cách quản lý state liên quan đến form thông minh hơn, được gắn trực tiếp với quá
                    trình gửi form.
                </p>

                <p>
                    Trong bài viết này, chúng ta sẽ phân tích <code>useActionState</code> là gì, lý do tại
                    sao nó hữu ích, và đi qua các ví dụ thực tế để bạn có thể tự tin tích hợp nó vào ứng dụng
                    của mình.
                </p>

                <h3 className="bg-light p-2 rounded mt-4">
                    <strong>useActionState</strong> là gì?
                </h3>

                <p>
                    <code>useActionState</code> là một hook trong React được thiết kế để xử lý việc cập nhật
                    state xảy ra sau khi một form được gửi.
                </p>
                <p>
                    Nếu bạn đang tìm hiểu về React hiện đại — đặc biệt là với React Server Components —
                    thì có một hook mạnh mẽ nhưng ít người biết đến mà bạn nên làm quen:
                    <code className="ms-1">useActionState</code>
                </p>

                <p>
                    Hook này có mặt trong các bản build experimental và Canary của React, và nó mang lại
                    một cách quản lý state liên quan đến form thông minh hơn, được gắn trực tiếp với quá
                    trình gửi form.
                </p>

                <p>
                    Trong bài viết này, chúng ta sẽ phân tích <code>useActionState</code> là gì, lý do tại
                    sao nó hữu ích, và đi qua các ví dụ thực tế để bạn có thể tự tin tích hợp nó vào ứng dụng
                    của mình.
                </p>

                <h3 className="bg-light p-2 rounded mt-4">
                    <strong>useActionState</strong> là gì?
                </h3>

                <p>
                    <code>useActionState</code> là một hook trong React được thiết kế để xử lý việc cập nhật
                    state xảy ra sau khi một form được gửi.
                </p>
                <p>
                    Nếu bạn đang tìm hiểu về React hiện đại — đặc biệt là với React Server Components —
                    thì có một hook mạnh mẽ nhưng ít người biết đến mà bạn nên làm quen:
                    <code className="ms-1">useActionState</code>
                </p>

                <p>
                    Hook này có mặt trong các bản build experimental và Canary của React, và nó mang lại
                    một cách quản lý state liên quan đến form thông minh hơn, được gắn trực tiếp với quá
                    trình gửi form.
                </p>

                <p>
                    Trong bài viết này, chúng ta sẽ phân tích <code>useActionState</code> là gì, lý do tại
                    sao nó hữu ích, và đi qua các ví dụ thực tế để bạn có thể tự tin tích hợp nó vào ứng dụng
                    của mình.
                </p>

                <h3 className="bg-light p-2 rounded mt-4">
                    <strong>useActionState</strong> là gì?
                </h3>

                <p>
                    <code>useActionState</code> là một hook trong React được thiết kế để xử lý việc cập nhật
                    state xảy ra sau khi một form được gửi.
                </p>
            </div>

            <div className="col-md-3 ">
                <div className="position-sticky" style={{ top: "20px" }}>
                <h5 className="text-muted">Bảng nội dung</h5>
                <ul className="list-unstyled ps-3">
                    <li><a href="#what-is" className="text-danger">useActionState là gì?</a></li>
                    <li>Ví dụ 1: Form tăng số đơn giản</li>
                    <li>Ví dụ 2: Hiển thị thông báo lỗi trong form</li>
                    <li>Ví dụ 3: Giữ nguyên state form khi chuyển trang</li>
                    <li>
                        Khi nào không nên dùng <code className="text-danger">useActionState</code>?
                    </li>
                    <li>Tổng kết</li>
                </ul>
                </div>

            </div>
           
        </div>
        <CommentComponent/>
        </>
    );
};

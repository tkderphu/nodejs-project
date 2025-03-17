function Post() {
    return (
        <>
            <div className="card mb-3">
                <div className="card-body d-flex">
                    <img src="https://images.viblo.asia/avatar-retina/f8a57b4c-034c-4efd-971a-763c5b4ccee1.jpg" 
                    alt="Author Image" className="rounded-circle me-3" width="70px" height={"70px"} />
                    <div>
                        <h5 className="card-title">Khảo sát Viblo: Nhu cầu phát triển sự nghiệp IT toàn cầu</h5>
                        <p className="card-text text-muted">Viblo Announcer - 2 phút đọc</p>
                        <p className="text-muted d-flex flex-wrap justify-content-between">
                            <button style={{ border: 'none', backgroundColor: 'white' }} data-toggle="tooltip" data-placement="top" title="Số lượng người xem">👁️ 10</button>
                            <span >💬 0</span>
                            <span>🔖 0</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Post
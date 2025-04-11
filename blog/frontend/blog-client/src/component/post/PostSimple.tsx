import { Post } from "../../model/Post"

function PostSimple(props: { post: Post, bookmark?: {
    show: boolean,
    fn: any,
    title: "Bookmark" | "Hủy bookmark"
} }) {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center  card-body d-flex link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacit"
                 >
                <a className="d-flex flex-column" href={`/posts/${props.post?._id}/${props.post?.title}`}>
                    <img src={props.post?.displayUrl} alt="Post Image" className="img-fluid rounded me-3" width={"250px"} height="200px" />
                    <span>{props.post?.timestamps?.createdAt}</span>
                </a>
                <div>
                    <h5 className="card-title">{props.post?.title}</h5>
                    <span className="text-muted">{props.post?.description}</span>
                    <p className="card-text text-muted">Tác giả:
                        <a className="link-offset-2 mt-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacit"
                            href={`/profile/${props.post?.user?._id}`}
                        // onClick={() => {
                        //     setFilter((prev) => ({
                        //         ...prev,
                        //         userId: props.post.user?._id,
                        //         userFullName: props.post.user?.fullName
                        //     }))
                        // }}
                        >{props.post?.user?.fullName}</a></p>
                    <div className="d-flex flex-wrap mb-3">
                        {props.post?.taggings?.map(tag => {
                            return (
                                <a href="#" onClick={() => {
                                    // const taggingNames = filter?.taggingNames || new Array()
                                    // if (taggingNames.filter(r => r == tag.name).length == 0) {

                                    //     //@ts-ignore
                                    //     taggingNames.push(tag.name)

                                    //     setFilter((prev) => ({
                                    //         ...prev,
                                    //         taggingNames: new Array(...taggingNames)
                                    //     }))
                                    // }
                                }} className="link-offset-2 mt-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacit" style={{
                                    padding: "10px",
                                    backgroundColor: "#A8A8A8",
                                    marginRight: "20px",
                                    borderRadius: "20px",
                                }}>{tag.name}</a>
                            )
                        })}
                    </div>
                    <p className="text-muted d-flex flex-wrap justify-content-between">
                        <button style={{ border: 'none', backgroundColor: 'white' }} data-toggle="tooltip" data-placement="top" title="Số lượng người xem">👁️ 10</button>
                        <span >💬 0</span>
                        <span>🔖 0</span>
                    </p>
                </div>
                <div>
                    {props.bookmark?.show && <button className="btn btn-primary" onClick={() => {
                        props.bookmark?.fn()
                    }}>{props.bookmark.title}</button>}
                </div>
            </div>
        </>
    )
}
export default PostSimple

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Post } from "../../model/Post"
import { fetchAllPostAction } from "../../redux/store/action/post/post.action"
import { PageResult } from "../common/model"
import AuthorComponent from "../profile/Author"
import Author from "../profile/Author"
import "./Home.css"
function Home() {
    const postResp: {
        pageResult: PageResult<Post>,
        hasError: boolean,
        loading: boolean
    } = useSelector((state: any) => {
        return state.fetchAllPost
    })

    const [filter, setFilter] = useState<{
        taggingNames?: Array<string>,
        userId?: string,
        keyword?: string,
        timestamps?: {
            startDate: any,
            endDate: any
        },
        userFullName?: string
    }>()

    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchAllPostAction({}))
    }, [])

    useEffect(() => {
        if (filter) {
            //@ts-ignore
            dispatch(fetchAllPostAction(filter))
        }
    }, [filter])

    return (
        <>

            <div className="container-fluid bg-dark text-white text-center py-4">
                <button className="btn btn-secondary"><a className="nav-link" href="/create-post">Add new post</a></button>

            </div>

            <div className="container mt-3">
                <ul className="nav nav-tabs">
                    <li className="nav-item"><a className="nav-link active" href="#">Posts</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Followings</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">My bookmarked</a></li>
                </ul>
            </div>

            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8">
                        <div className="d-flex align-items-center ">
                            <h3>Date</h3>
                            <div className="mx-3">
                                <div className="mb-3"><span>Start</span>: <input type={'date'}/> </div>
                               <div className="mb-3"> <span>End</span>: <input type={'date'}/></div>
                            </div>
                        </div>
                        <div className="d-flex">
                            {filter?.taggingNames && <h3>Tags</h3>}
                            <div className="d-flex flex-wrap">
                                {filter?.taggingNames?.map(tag => {
                                    return (
                                        <>
                                            <div className="mx-3 mb-3">
                                                <span style={{ backgroundColor: "gray" }}>{tag}</span>
                                                <button onClick={() => {
                                                    const taggingNames = filter?.taggingNames || new Array()
                                                    const newArr = taggingNames.filter(name => name != tag)
                                                    if (newArr.length == 0) {
                                                        setFilter((prev) => ({
                                                            ...prev,
                                                            taggingNames: undefined
                                                        }))
                                                    } else {
                                                        setFilter((prev) => ({
                                                            ...prev,
                                                            taggingNames: new Array(...newArr)
                                                        }))
                                                    }

                                                }}>X</button>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>

                        </div>
                        <div className="d-flex">
                            {filter?.userId && (<>
                                <div className="d-flex align-items-center">
                                    <h3>Author</h3>
                                    <div className="mx-5">
                                        <AuthorComponent />
    
                                    </div>
                                    <button onClick={() => {
                                            setFilter((prev) => ({
                                                ...prev,
                                                userId: undefined
                                            }))
                                        }}>X</button>
                                </div>
                                {/* <div className="d-flex flex-wrap">
                                    <div className="mx-3 mb-3">
                                        <span style={{ backgroundColor: "gray" }}>{filter?.userFullName}</span>
                                        <button onClick={() => {
                                            setFilter((prev) => ({
                                                ...prev,
                                                userId: undefined
                                            }))
                                        }}>X</button>
                                    </div>
                                </div> */}

                            </>)}
                        </div>
                        {postResp?.pageResult?.list?.map(post => {
                            return (
                                <div className="card mb-3">
                                    <a className="card-body d-flex link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacit"
                                        href={`/posts/${post._id}/${post.title}`} >
                                        <div className="d-flex flex-column">
                                            <img src={post.displayUrl} alt="Post Image" className="img-fluid rounded me-3" width={"250px"} height="200px" />
                                            <span>{post.timestamps?.createdAt}</span>
                                        </div>
                                        <div>
                                            <h5 className="card-title">{post.title}</h5>
                                            <span className="text-muted">{post.description}</span>
                                            <p className="card-text text-muted">Tác giả:
                                                <a className="link-offset-2 mt-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacit"
                                                    href={"#"} onClick={() => {
                                                        setFilter((prev) => ({
                                                            ...prev,
                                                            userId: post.user?._id,
                                                            userFullName: post.user?.fullName
                                                        }))
                                                    }}>{post.user?.fullName}</a></p>
                                            <div className="d-flex flex-wrap mb-3">
                                                {post.taggings?.map(tag => {
                                                    return (
                                                        <a href="#" onClick={() => {
                                                            const taggingNames = filter?.taggingNames || new Array()
                                                            if (taggingNames.filter(r => r == tag.name).length == 0) {

                                                                //@ts-ignore
                                                                taggingNames.push(tag.name)

                                                                setFilter((prev) => ({
                                                                    ...prev,
                                                                    taggingNames: new Array(...taggingNames)
                                                                }))
                                                            }
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
                                    </a>
                                </div>
                            )
                        })}
                    </div>

                    <div className="col-md-4 sticky-sidebar">

                        <h5 className="text-primary ">Top authors</h5>
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
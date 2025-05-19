import { Link } from "react-router-dom"
import { Post } from "../../model/Post"
import { PageResult } from "../common/model"
import PagingComponent from "../paging/PagingComponent"
import PostSimple from "../post/PostSimple"
import PostSimpleComponent from "../post/PostSimpleComponent"

export default function SearchPost(props: {
    pageResult: PageResult<Post>
}) {
    return <>
        {props.pageResult?.list?.map((post, idx) => (
            <PostSimpleComponent showPreview={false} post={post} />
        ))}
        {props.pageResult?.list?.length > 0 && (<div className="d-flex justify-content-center">
            {props.pageResult && <PagingComponent
                currentPage={props.pageResult.currentPage}
                totalPage={props.pageResult.totalPage}
            />}
        </div>)}
    </>
}
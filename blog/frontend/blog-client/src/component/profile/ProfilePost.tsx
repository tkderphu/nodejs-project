import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Post } from "../../model/Post";
import { fetchPostAction, fetchPostByAuthorIdAction } from "../../redux/store/action/post/post.action";
import AlertConponent from "../common/AlertComponent";
import PostSimpleComponent from "../post/PostSimpleComponent";
export default function ProfilePost() {
    const { id } = useParams()
    const state: {
        posts: Post[],
        loading: boolean,
        hasError: boolean,
        error: any 
    } = useSelector((state: any) => {
        return state.fetchPostByAuthorId
    })

    console.log("data: ", state)

    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchPostByAuthorIdAction(id))
    }, [])  


    if(state.loading || state.hasError) {
        return <AlertConponent loading={state.loading} error={state.error} hasError={state.hasError} />
    }
    return <>
        {state.posts?.map(post => {
            return <PostSimpleComponent showPreview={false} post={post} />
        })}
    </>
}
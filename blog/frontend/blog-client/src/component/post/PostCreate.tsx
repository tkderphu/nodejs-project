import React, { useState } from "react";
import ReactDOM from "react-dom";
import "jodit";
// import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";
import postService from "../../service/post.service";
import { useDispatch, useSelector } from "react-redux";
import { stat } from "fs";
import { createPostAction } from "../../redux/store/action/post/post.action";
import Editor from "../common/Editor";

function PostCreate() {
    const [title, setTile] = useState('')
    const [content, setContent] = useState('');
    const [displayUrl, setDisplayUrl] = useState('')
    const [taggingName, setTaggingName] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()
    const {loading, hasError, message, status} = useSelector((state: any) => {
        return state.createPost
    })

    const publishPost = () => {
        const taggings = taggingName.split(",").map((tagging) => {
            return tagging.trim().toLowerCase()
        })
        if(taggings.length >= 3) {
            const request: any = {
                title: title,
                content: content,
                taggingNames: taggings,
                displayUrl: displayUrl,
                description: description
            }
            //@ts-ignore
            dispatch(createPostAction(request))
            console.log(request)
        } else {
            alert("At least 3 tagging")
        }
        
    }


    return (
        <div className="mt-3">
            <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input type="text" className="form-control" onChange={(e) => {
                    setTile(e.target.value)
                }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title of post" />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Description</label>
                <input type="text" className="form-control" onChange={(e) => {
                    setDescription(e.target.value)
                }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description about post" />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Display url</label>
                <input type="text" className="form-control" onChange={(e) => {
                    setDisplayUrl(e.target.value)
                }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Url image" />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Tagging name(each tagging seperate by comma)</label>
                <input type="text" className="form-control" onChange={(e) => {
                    setTaggingName(e.target.value)
                }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="java, spring, jwt, websocket" />
            </div>
            <div>
                <label>Content</label>
                <Editor
                    content={content}
                    fn={(value: any) => {
                        setContent(value)
                    }}
                />
            </div>
            {hasError && <div className="alert alert-danger mt-3" role="alert">
                   {message}
                </div>}
             {loading && <div className="d-flex justify-content-center align-items-center mt-3"><div className="spinner-border mx-3" role="status"/> <span>Please wait</span></div>}
            {!loading && <button className="btn btn-primary w-100 mt-3" onClick={() => {
                publishPost()
            }}>Đăng bài</button>}
        </div>
    );
}
export default PostCreate
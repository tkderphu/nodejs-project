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
import AlertConponent from "../common/AlertComponent";
import { createSeriesAction } from "../../redux/store/action/series/series.action";
import { SeriesCreateReq } from "../../service/series.service";

function SeriesCreate() {
    const [title, setTile] = useState('')
    const [content, setContent] = useState('');
    const [displayUrl, setDisplayUrl] = useState('')
    const [taggingName, setTaggingName] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()
    const { loading, hasError, error } = useSelector((state: any) => {
        return state.createSeries
    })

    const createSeries = () => {
        const taggings = taggingName.split(",").map((tagging) => {
            return tagging.trim().toLowerCase()
        })
        if (taggings.length >= 3) {
            const request: SeriesCreateReq = {
                title: title,
                content: content,
                tagNames: taggings,
                displayUrl: displayUrl,
                description: description
            }
            //@ts-ignore
            dispatch(createSeriesAction(request))
            console.log(request)
        } else {
            alert("At least 3 tagging")
        }

    }


    return (
        <div className="mt-3">
            <h2 className="text-center">Mẫu tạo Series</h2>
            <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Tiêu đề</label>
                <input type="text" className="form-control" onChange={(e) => {
                    setTile(e.target.value)
                }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title of post" />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Mô tả</label>
                <input type="text" className="form-control" onChange={(e) => {
                    setDescription(e.target.value)
                }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description about post" />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Ảnh hiển thị</label>
                <input type="text" className="form-control" onChange={(e) => {
                    setDisplayUrl(e.target.value)
                }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Url image" />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Nhãn(mỗi nhãn ngăn cách nhau bởi dấu ,)</label>
                <input type="text" className="form-control" onChange={(e) => {
                    setTaggingName(e.target.value)
                }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="java, spring, jwt, websocket" />
            </div>
            <div>
                <label>Nội dung</label>
                <Editor
                    content={content}
                    fn={(value: any) => {
                        setContent(value)
                    }}
                />
            </div>
            <AlertConponent error={error} loading={loading} hasError={hasError} />
            {!loading && <button className="btn btn-primary w-100 mt-3" onClick={() => {
                createSeries()
            }}>Tạo series</button>}
        </div>
    );
}
export default SeriesCreate
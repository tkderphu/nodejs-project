import PagingComponent from "../paging/PagingComponent";
import AuthorInfo from "../profile/AuthorInfo";

export default function SearchAuthor() {
    return <>
        <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-wrap flex-row">
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
                
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
                
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
                
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
                <div style={{ marginLeft: "10px" }}><AuthorInfo /></div>
            </div>

            <div className="">
            <PagingComponent currentPage={2} totalPage={10} />
            </div>
        </div>
    </>
}
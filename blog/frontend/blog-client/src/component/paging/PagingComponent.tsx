import { useEffect } from "react";
import { Link } from "react-router-dom";

function convertNumToArr(numb: number) {
    const arr = []
    for(let i = 1; i <= numb; i++) arr.push(i)
    return arr;
}
export default function PagingComponent(props: {
    currentPage: number,
    totalPage: number
}) {
    useEffect(() => {}, [props.currentPage])
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
                {convertNumToArr(props.totalPage).map((page, index) => {
                    console.log("page: ", page)
                    if(index > 5) return null;
                    return (
                        <li className={`page-item ${page === props.currentPage ? "active" : ""}`}><Link className="page-link" to={`?page=${page}`} state={{
                            page: page
                        }}>{page}</Link></li>
                    )
                })}
                {props.totalPage - 5 >= 10 && (
                        <>
                        <li className="page-item">...</li>
                        <li className={`page-item ${props.totalPage - 1 === props.currentPage ? "active" : ""}`}><a className="page-link" href="#">{props.totalPage - 1}</a></li>
                        <li className={`page-item ${props.totalPage === props.currentPage ? "active" : ""}`}><a className="page-link" href="#">{props.totalPage}</a></li>
                        </>
                )}

                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
import { Author } from "../../model/User"

function AuthorComponent(props: {author?: Author}) {
    return (
        <li className="list-group-item d-flex align-items-center">
            <img src="top_author2.jpg" alt="Top Author" className="rounded-circle me-3" width="40" />
            <div>
                <span>{props.author?.fullName}</span><br />
                <small className="text-muted">👁️ {props.author?.view} | 📝 {props.author?.numberPosts} | 👥 {props.author?.followers}</small>
            </div>
        </li>
    )
}
export default AuthorComponent
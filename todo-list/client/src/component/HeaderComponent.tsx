function HeaderComponent() {
    return (
        <ul className="nav">
            <li className="nav-item">
                <a className="nav-link active" href="/create-todo">Create todo</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/list">List todo</a>
            </li>
           
        </ul>
    )
}
export default HeaderComponent
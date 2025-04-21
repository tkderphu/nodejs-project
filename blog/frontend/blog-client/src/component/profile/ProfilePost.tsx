import { useParams } from "react-router-dom";

export default function ProfilePost() {
    const { id } = useParams()

    return <>this is page for post of author</>
}
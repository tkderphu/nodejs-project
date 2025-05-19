import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Return() {
    useEffect(() => {
        window.close()
    },[])

    return null;
}
import { useNavigate } from "react-router-dom"
import { Response } from "./models/common/Response"
import { removeUserAuth } from "./storage/auth/auth"

export const HandleError = (error: Response) => {
    // navigate
    const navigate = useNavigate()

    if (error.code === 401) {
        removeUserAuth()
        navigate('/login')
    }
}
import { useQuery } from "react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { UserInfo } from "../types/types"

// loginしているuserの情報を取得する
export const useQueryUser = () => {
    const navigate = useNavigate()
    const getCurrentUser = async () => {
        const {data} = await axios.get<UserInfo>(
            `${process.env.REACT_APP_FASTAPI_URL}/user`,
            {
                withCredentials: true
            }
        )
        return data
    }
    return useQuery({
        queryKey: "user",
        queryFn: getCurrentUser,
        staleTime: Infinity,
        onError: () => navigate("/")
    })
}
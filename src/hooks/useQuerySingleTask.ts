import { useQuery } from "react-query"
import axios from "axios"
import { useAppDispatch } from "../app/hooks"
import { resetEditedTask, toggleCsrfState } from "../slices/appSlice"
import { Task } from "../types/types"
import { useNavigate } from "react-router-dom"

export const useQuerySingleTask = (id: string) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const getSingleTask = async (id: string) => {
        const {data} = await axios.get<Task>(
            `${process.env.REACT_APP_FASTAPI_URL}/todo/${id}`,
            {
                withCredentials: true
            }
        )
        return data
    }
    return useQuery({
        queryKey: ["single", id],
        queryFn: () => getSingleTask(id),
        enabled: !!id,
        staleTime: Infinity,
        // cacheTime: 300000,
        onError: (err: any) => {
            alert(`${err.response.data.datail}\n${err.message}`)
            if (
                err.response.data.datail === "The JWT has expired" ||
                err.response.data.datail === "The CSRF token has expired" 
            ) {
                // 再度CSRFトークンの取得
                dispatch(toggleCsrfState())
                // 編集中のタスクのリセット
                dispatch(resetEditedTask())
                navigate("/")
            }
        },
    })
}
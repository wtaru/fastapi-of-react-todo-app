import { useQuery } from "react-query"
import axios from "axios"

import { Task } from "../types/types"

// タスクを取ってくるHooks
export const useQueryTasks = () => {
    const getTasks = async () => {
        const {data} = await axios.get<Task[]>(
            `${process.env.REACT_APP_FASTAPI_URL}/todo`,
            {withCredentials: true}
        )
        return data
    }

    return useQuery<Task[], Error>({
        queryKey: "tasks",
        queryFn: getTasks,
        staleTime: Infinity,
    })
}
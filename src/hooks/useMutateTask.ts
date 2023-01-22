import axios from "axios"
import { useNavigate } from "react-router-dom";
import {useQueryClient, useMutation} from "react-query"

import { resetEditedTask, toggleCsrfState } from "../slices/appSlice";
import { useAppDispatch } from "../app/hooks";
import { Task } from "../types/types";

export const useMutateTask = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const queryclient = useQueryClient()

    // idを除いたdataをobjectで取得
    const createTaskMutation = useMutation((task: Omit<Task, "id">) => 
        axios.post<Task>(
            `${process.env.REACT_APP_FASTAPI_URL}/todo`,
            task,
            {
                withCredentials: true
            }
        ),
        {
            onSuccess: (res) => {
                // タスクのkeyを取得し一覧を表示
                const prevousTodos = queryclient.getQueryData<Task[]>("tasks")
                if (prevousTodos) {
                    queryclient.setQueryData("tasks", [...prevousTodos, res.data])
                }
                dispatch(resetEditedTask())
            },
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
        }
    )

    // 更新用
    const updataTaskMutation = useMutation((task: Task) => 
        axios.put<Task>(
            `${process.env.REACT_APP_FASTAPI_URL}/todo/${task.id}`,
            {
                title: task.title,
                description: task.description
            },
            {
                withCredentials: true
            }
        ),
        {
            // 第二引数はuseMutationに渡した引数の値を参照できる
            onSuccess: (res, variables) => {
                // タスクのkeyを取得し一覧を表示
                const prevousTodos = queryclient.getQueryData<Task[]>("tasks")
                if (prevousTodos) {
                    queryclient.setQueryData<Task[]>(
                        "tasks",
                        prevousTodos.map(task => 
                            // res.data = 更新後のdataに置き換え
                            task.id === variables.id ? res.data : task
                        )
                    )
                }
                dispatch(resetEditedTask())
            },
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
        }
    )

    // 更新用
    const daleteTaskMutation = useMutation((id: string) => 
        axios.delete(
            `${process.env.REACT_APP_FASTAPI_URL}/todo/${id}`,
            {
                withCredentials: true
            }
        ),
        {
            // 第二引数はuseMutationに渡した引数の値を参照できる
            onSuccess: (res, variables) => {
                // タスクのkeyを取得し一覧を表示
                const prevousTodos = queryclient.getQueryData<Task[]>("tasks")
                if (prevousTodos) {
                    queryclient.setQueryData<Task[]>(
                        "tasks",
                        prevousTodos.filter(task => 
                            // res.data = 更新後のdataに置き換え
                            task.id === variables
                        )
                    )
                }
                dispatch(resetEditedTask())
            },
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
        }
    )
    return {
        createTaskMutation,
        updataTaskMutation,
        daleteTaskMutation
    }
}
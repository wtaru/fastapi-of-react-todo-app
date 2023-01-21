import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"

import { useAppDispatch } from "../app/hooks"
import { resetEditedTask, toggleCsrfState } from "../slices/appSlice"
import { User } from "../types/types"

export const useMutateAuth = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // loginを実行する際に呼び出される処理
    const loginMutation = useMutation(
        // user: タイピングしたemailとpassword
        async (user: User) => 
            await axios.post(
                `${process.env.REACT_APP_FASTAPI_URL}/login`,
                user,
                // cooke付きのloginにする
                {withCredentials: true}
            ),
            {
                // 通信の成功時
                onSuccess: () => {
                    navigate("/todo")
                },
                // 失敗時
                onError: (err: any) => {
                    alert(`${err.response.data.datail}\n${err.message}`)
                    if (err.response.data.datail === "The CSRF token has expired") {
                        dispatch(toggleCsrfState())
                    }
                }
            }
    )

    // register用
    const registerMutation = useMutation(
        async (user: User) =>
            await axios.post(
                `${process.env.REACT_APP_FASTAPI_URL}/register`, 
                user,
            ),
            {
                onError: (err: any) => {
                    alert(`${err.response.data.datail}\n${err.message}`)
                    if (err.response.data.datail === "The CSRF token has expired") {
                        dispatch(toggleCsrfState())
                    }
                },
            }
    )

    // logout用
    const logoutMutation = useMutation(
        async () =>
            await axios.post(
                `${process.env.REACT_APP_FASTAPI_URL}/logout`,
                {},
                { withCredentials: true }
            ),
            {
                onSuccess: () => {
                    navigate("/")
                },
                onError: (err: any) => {
                    alert(`${err.response.data.datail}\n${err.message}`)
                    if (err.response.data.datail === "The CSRF token has expired") {
                        dispatch(toggleCsrfState())
                        dispatch(resetEditedTask())
                        navigate("/")
                    }
                }
            }
    )


    return {loginMutation, registerMutation, logoutMutation}
}
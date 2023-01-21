// submitが押された時に呼ばれるhooks
import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "react-query"
import { useMutateAuth } from "./useMutateAuth"

export const useProcessAuth = () => {
    const navite = useNavigate()
    const queryClient = useQueryClient()
    const { loginMutation, registerMutation, logoutMutation } =useMutateAuth()

    // userの入力情報を保持
    const [email, setEmail] = useState("")
    const [pw, setPw] = useState("")
    // loginモード or registerモードの管理
    const [isLogin, setIsLogin] = useState(true)

    // submitボタンが押された時の関数
    const processAuth = async (e: FormEvent<HTMLFormElement>) => {
        //  リロードが走らないようにする
        e.preventDefault()

        if (isLogin) {
            loginMutation.mutate({
                email: email,
                password: pw,
            })
        } else {
            // まずがresgisterの処理を実行
            await registerMutation
                .mutateAsync({
                    email: email,
                    password: pw,
                })
                // 成功時は続けてloginを実行する
                .then(() => 
                    loginMutation.mutate({
                        email: email,
                        password: pw,
                    })
                )
                .catch(() => {
                    setPw("")
                    setEmail("")
                })
        }
    }

    // logout関数
    const logout = async () => {
        await logoutMutation.mutateAsync()
        queryClient.removeQueries("tasks")
        queryClient.removeQueries("user")
        queryClient.removeQueries("single")
        navite("/")
    }

    return { 
        email,
        setEmail,
        pw,
        setPw,
        isLogin,
        setIsLogin,
        processAuth,
        registerMutation,
        loginMutation,
        logout
    }
}
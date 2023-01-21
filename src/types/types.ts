// task型定義
export interface Task {
    id: string
    title: string
    description: string
}

// apiを作動させる値の型
export interface UserInfo {
    email: string
}

// frontからapiに渡す値の型
export interface User {
    email: string
    password: string
}

// csrfトークンの型
export interface CsrfToken {
    csrf_token: string
}
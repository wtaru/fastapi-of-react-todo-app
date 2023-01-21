import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { Task } from "../types/types"

// storeで扱うstateの型定義
export interface AppState {
    editedTask: Task
    csrfTokenExp: boolean
}

// state初期値
const initialState: AppState = {
    editedTask: {
        id: "",
        title: "",
        description: ""
    },
    csrfTokenExp: false
}

// slice作成
export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        // 新タスクを受け取る
        setEditedTask: (state, action: PayloadAction<Task>) => {
            state.editedTask = action.payload
        },
        // stateのreset
        resetEditedTask: (state) => {
            state.editedTask = initialState.editedTask
        },
        // csrf_tokenの判定
        toggleCsrfState: (state) => {
            state.csrfTokenExp = !state.csrfTokenExp        
        }
    },
})

export const { setEditedTask, resetEditedTask, toggleCsrfState } = 
    appSlice.actions

// reactのcomponentからReduxのstateを読みに行く関数作成
export const selectTask = (state: RootState) => state.app.editedTask
export const selectCsrfState = (state: RootState) => state.app.csrfTokenExp

export default appSlice.reducer
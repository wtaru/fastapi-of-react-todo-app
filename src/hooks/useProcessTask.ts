import { FormEvent } from "react";

import { useAppSelector } from "../app/hooks";
import { useMutateTask } from "./useMutateTask";
import { selectTask } from "../slices/appSlice";

// submitが押されたとき実行する処理
export const useProcessTask = () => {
    const editedTask = useAppSelector(selectTask)
    const { createTaskMutation, updataTaskMutation } = useMutateTask()
    // ボタンが押されたときに実行する関数
    const processTask = (e: FormEvent<HTMLFormElement>) => {
        // 再レンダリング防止
        e.preventDefault()
        // taskがなければ
        if (editedTask.id === "") {
            // 作成
            createTaskMutation.mutate({
                title: editedTask.title,
                description: editedTask.description
            })
        } else {
            // idがあれば更新
            updataTaskMutation.mutate(editedTask)
        }
    }
    return {processTask} 
}

import React, { FC, memo } from "react"
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid"

import { Task } from "../types/types"
import { useAppDispatch } from "../app/hooks"
import { setEditedTask } from "../slices/appSlice"
import { useMutateTask } from "../hooks/useMutateTask"

// &で新しい属性を追加していく事ができる
const TaskItemMemo: FC<
  Task & { setId: React.Dispatch<React.SetStateAction<string>> }
> = ({ id, title, description, setId }) => {
  const dispatch = useAppDispatch()
  const { daleteTaskMutation } = useMutateTask()
  return (
    <li>
      <span className="font-bold cursor-pointer" onClick={() => setId(id)}>{title}</span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() =>
            dispatch(
              setEditedTask({
                id: id,
                title: title,
                description: description,
              })
            )
          }
        />
        <TrashIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            daleteTaskMutation.mutate(id)
          }}
        />
      </div>
    </li>
  )
}

export const TaskItem = memo(TaskItemMemo)

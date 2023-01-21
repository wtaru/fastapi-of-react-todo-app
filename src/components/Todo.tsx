import {FC} from 'react'
import { LogoutIcon } from "@heroicons/react/outline"
import { useProcessAuth } from '../hooks/useProcessAuth'

export const Todo: FC = () => {
    const {logout} = useProcessAuth()
    return (
        <div className='flex justify-center items-center flex-col min-h-screen text-gray-500 font-mono'>
            <LogoutIcon
                onClick={logout}
                className="h-2 w-2 mt-1 mb-5 text-blue-500 cursor-pointer"
            />
        </div>
    )
}

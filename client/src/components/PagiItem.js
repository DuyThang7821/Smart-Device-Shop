import React from "react";
import clsx from 'clsx'
const PagiItem = ({children}) =>{
    return(
        <div className={clsx('w-10 h-10 cursor-pointer flex justify-center p-4 hover:rounded-full hover:bg-gray-300', !Number(children) && 
        'items-end pb-2', Number(children) && 'items-center')}>
            {children}
        </div>
    )
}
export default PagiItem
import React from "react";

const InputField = ({value, setValue, nameKey, type, invalidFields, setInvalidFields}) =>{

    return(
        <div className="w-full relative">
           {value.trim() !== '' &&  <label className="text-[12px] animate-slide-top-sm absolute top-[5px] left-[2px] block bg-white px-2" htmlFor={nameKey}>{nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}</label>}
            <input type ={type || 'text'}
            className="px-4 py-3 border-[2px] rounded-sm border w-full my-4 placeholder:text-md placeholder:italic outline-none"
            placeholder= {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
            value={value}
            onChange={e => setValue(prev =>({...prev, [nameKey]: e.target.value}))} 

            />
        </div>
    )
}
export default InputField
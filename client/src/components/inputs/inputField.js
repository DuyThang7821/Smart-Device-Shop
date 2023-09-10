import React,{memo} from "react";
import clsx from "clsx";
const InputField = ({value, setValue, nameKey, type, invalidFields, setInvalidFields,style, fullWidth, placeholder, isHideLabel}) =>{

    return(
        <div className={clsx('flex flex-col relative mb-3 w-full', fullWidth && 'w-full')}>
           {!isHideLabel && value?.trim() !== '' &&  <label className="text-[12px] animate-slide-top-sm absolute top-[5px] left-[2px] block bg-white px-2" htmlFor={nameKey}>{nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}</label>}
            <input type ={type || 'text'}
            className={clsx('px-4 py-3 border-[2px] rounded-sm border w-full mt-4 placeholder:text-md placeholder:italic outline-none',style)}
            placeholder= {placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
            value={value}
            onChange={e => setValue(prev =>({...prev, [nameKey]: e.target.value}))} 
            onFocus={()=> setInvalidFields && setInvalidFields([])}
            />
        {invalidFields?.some(el => el.name === nameKey) && <small className="text-main  italic">
        {invalidFields?.find(el => el.name === nameKey)?.mes}</small>}
        </div>
    )
}
// [{name: password, mes: required}]
export default memo(InputField)
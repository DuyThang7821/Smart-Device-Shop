import React from "react";

const Button = ({name, handleOnClick, style, iconsBefore, iconsAfter, fw}) =>{
    return(
        <button
        type="button"
        className={style ? style : `px-4 py-2 rounded-md text-white bg-main text-semibold my-2 ${fw ? 'w-full': 'w-fit'}`}
        onClick={() => {handleOnClick && handleOnClick()}}
        >
            {iconsBefore}
            <span>{name}</span>
            {iconsAfter}
        </button>
    )
}
export default Button
import React ,{memo}from "react";

const Banner = () =>{
    return(
        <div className="w-full">
            <img src="https://t4.ftcdn.net/jpg/03/20/46/13/360_F_320461388_5Snqf6f2tRIqiWlaIzNWrCUm1Ocaqhfm.jpg" 
            alt="banner"
            className="h-[400px] w-full object-cover"
            />
        </div>
    )
}
export default memo(Banner)
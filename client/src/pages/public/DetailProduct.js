import React from "react";
import { useParams } from "react-router-dom";

const DetailProduct = () =>{
    const { pid, title} = useParams()
    
    return(
        <div>DetailProduct</div>
    )
}
export default DetailProduct
import WithBaseComponent from "hocs/withBaseComponent";
import React from "react";

const MyCart = (props) =>{
    console.log(props)
    return(
        <div onClick={() => props.navigate('/')}>My Cart</div>
    )
}
export default WithBaseComponent(MyCart)
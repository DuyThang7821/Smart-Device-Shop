import WithBaseComponent from "hocs/withBaseComponent";
import React from "react";

const MyCart = (props) =>{
    console.log(props)
    return(
        <div onClick={() => props.navigate('/')}>MyCart</div>
    )
}
export default WithBaseComponent(MyCart)
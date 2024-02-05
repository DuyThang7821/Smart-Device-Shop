import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const WithBaseComponent = (Component) => (props) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation()
    return <Component {...props} navigate={navigate} dispatch={dispatch} location={location} />
}


export default WithBaseComponent
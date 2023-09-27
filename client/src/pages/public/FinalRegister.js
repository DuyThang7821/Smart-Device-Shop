import React, { useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";
import path from "../../ultils/path";
import Swal from "sweetalert2";
const FinalRegister = () =>{
    const {status} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        if(status === 'failed') Swal.fire('Oops!','Đăng kí không thành công','error').then(()=>{
            navigate(`/${path.LOGIN}`)
        });

        if(status === 'success') Swal.fire('Chúc mừng','Đăng kí tài khoản thành công','success').then(()=>{
            navigate(`/${path.LOGIN}`)
        })
    }, [])
    return(
        <div className="h-screen w-screen bg-gray-100">
            
        </div>
        // <Navigate to={`/${path.LOGIN}`} state={{status}} />
    )
}
export default FinalRegister
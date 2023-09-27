import React, { memo , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { getCurrent } from "../../store/user/asyncActions";
import { useDispatch , useSelector} from "react-redux";
import icons from "../../ultils/icons";
import { logout, clearMessage } from "../../store/user/userSlice";
import Swal from "sweetalert2";
const {AiOutlineLogout} = icons
const TopHeader = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoggedIn, current, mes} = useSelector(state => state.user)
    useEffect(()=>{
        const setTimeoutId = setTimeout(() =>{
            if(isLoggedIn) dispatch(getCurrent())
        },300)
        return () =>{
            clearTimeout(setTimeoutId)
        }
    },[dispatch, isLoggedIn])
    useEffect (()=>{
        if(mes) Swal.fire('Oops!', mes, 'info').then(()=>{
            dispatch(clearMessage())
            navigate(`/${path.LOGIN}`)

        })
    },[mes])
    return(
        <div className="h-[58px] p-4 w-full bg-blue-700 flex items-center justify-center">
            <div className="w-main flex items-center justify-between text-md text-white"> 
            <span>ĐẶT HÀNG ONLINE HOẶC LIÊN HỆ CHO CHÚNG TÔI: 0826257475</span>
            {isLoggedIn && current 
            ? <div className="flex gap-4 text-sm items-center">
                <span>{`Chào mừng, ${current?.lastname} ${current?.firstname}`}</span>
                <span
                onClick={()=> dispatch(logout())}
                className="cursor-pointer hover:rounded-full hover:bg-gray-200 hover:text-main p-2"><AiOutlineLogout size={18} /></span>
            </div> 
            :<Link className="hover:text-yellow-300" to={`/${path.LOGIN}`}>Đăng nhập hoặc tạo tài khoản</Link>}
            </div>
        </div>
    )
}
export default TopHeader
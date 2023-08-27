import React, { memo } from "react";
import { Link } from "react-router-dom";
import path from "../ultils/path";
const TopHeader = () =>{
    return(
        <div className="h-[58px] w-full bg-main flex items-center justify-center">
            <div className="w-main flex items-center justify-between text-md text-white"> 
            <span>ĐẶT HÀNG ONLINE HOẶC LIÊN HỆ CHO CHÚNG TÔI: 0826257475</span>
            <Link className="hover:text-gray-800" to={`/${path.LOGIN}`}>Đăng nhập hoặc tạo tài khoản</Link>
            </div>
        </div>
    )
}
export default memo(TopHeader) 
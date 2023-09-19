import React, { Fragment, memo, useEffect, useState } from "react";
import logo from "assets/logo.png";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/user/userSlice";
import WithBaseComponent from "hocs/withBaseComponent";
import { showCart } from "store/app/appSlice";

const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;
const Header = ({dispatch}) => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  
  useEffect(()=>{
    const handleClickoutOptions = (e) =>{
      const profile = document.getElementById('profile')
      if(!profile?.contains(e.target)) setIsShowOption(false)
    } 
    document.addEventListener('click', handleClickoutOptions)
    return () =>{
      document.removeEventListener('click', handleClickoutOptions)
    }
  }, [])
  return (
    <div className="w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>

      <div className="flex text-[14px] ">
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-4 items-center">
            <RiPhoneFill color="red" size={25} />
            <span className="font-semibold">0826257475</span>
          </span>
          <span>Mon-Sat 9:00 AM - 8:00 PM</span>
        </div>

        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-4 items-center">
            <MdEmail color="red" size={25} />
            <span className="font-semibold">thangcbq78@gmail.com</span>
          </span>
          <span>Hỗ trợ online 24/7</span>
        </div>

        {current && (
          <Fragment>
            <div onClick={() => dispatch(showCart())} className="flex items-center cursor-pointer justify-center gap-2 px-6 border-r">
              <BsHandbagFill color="red" size={25} />
              <span>{`${current?.cart?.length || 0} sản phẩm`}</span>
            </div>

            <div
            id="profile"
            onClick={()=> setIsShowOption(prev => !prev)} 
            className="flex items-center cursor-pointer justify-center px-6 gap-2 relative rounded-md"
            >
              <FaUserCircle size={25} />
              <span>Tài khoản</span>
              {isShowOption && <div onClick={e => e.stopPropagation()} className="rounded-md flex-col flex py-2 absolute top-full left-[16px] bg-gray-100 border min-w-[150px] text-center">
                <Link className="w-full p-2 hover:bg-sky-500" to={`/${path.MEMBER}/${path.PERSONAL}`}>Trang cá nhân</Link>
                {+current.role === 1945 && <Link className="w-full p-2 hover:bg-sky-500" to={`/${path.ADMIN}/${path.DASHBOARD}`}>Trang quản lí</Link> }
                <span
                onClick={() => dispatch(logout())}
                 className="w-full p-2 hover:bg-sky-500">Đăng xuất</span>
              </div>}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};
export default WithBaseComponent(memo(Header));

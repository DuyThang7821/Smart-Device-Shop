import React, { memo, Fragment, useState } from "react";
import logo from "assets/logo.png";
import { adminSidebar } from "ultils/contants";
import { NavLink, Link } from "react-router-dom";
import clsx from "clsx";
import { AiOutlineCaretDown, AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

const activeStyle =
  "px-4 py-2 flex items-center gap-2 bg-blue-600 text-gray-100";
const notActiveStyle = "px-4 py-2 flex items-center  gap-2 hover:bg-blue-100";

const AdminSidebar = () => {
  const [actived, setActived] = useState([]);
  const handleShowTabs = (tabID) =>{
    if(actived.some(el => el === tabID)) setActived(prev => prev.filter(el => el !== tabID))
    else setActived(prev => [...prev, tabID])
  }
  return (
    <div className="bg-white h-full py-4">
      <Link to={'/'} className="flex flex-col justify-center p-4 items-center gap-2">
        <img src={logo} alt="logo" className="w-[200px] object-contain" />
        <small className="text-black font-semibold">Trang quản lí</small>
      </Link>
      <div className="text-black">
        {adminSidebar?.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                className={({ isActive }) =>
                  clsx(isActive && activeStyle, !isActive && notActiveStyle,)
                }
                to={el.path}
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <div
              onClick={() => handleShowTabs(+el.id)}
               className="flex flex-col ">
                <div className="flex items-center justify-between px-4 py-2 hover:bg-blue-100 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                {actived.some(id => id === el. id) ? <AiOutlineCaretRight /> : <AiOutlineCaretDown />}
                </div>
                {actived.some(id => +id === +el.id) && (
                  <div className="flex flex-col ">
                    {el.submenu.map((item) => (
                      <NavLink
                        key={item.text}
                        to={item.path}
                        onClick={e => e.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activeStyle,
                            !isActive && notActiveStyle,
                            "pl-10"
                          )
                        }
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
export default memo(AdminSidebar);

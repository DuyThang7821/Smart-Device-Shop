import React, { memo, Fragment, useState } from "react";
import avatar from "assets/avatarDefault.jpg";
import { adminSidebar, memberSidebar } from "ultils/contants";
import { NavLink, Link } from "react-router-dom";
import clsx from "clsx";
import { TbArrowForwardUp} from 'react-icons/tb'
import {
  AiOutlineCaretDown,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
} from "react-icons/ai";
import { useSelector } from "react-redux";

const activeStyle =
  "px-4 py-2 flex items-center gap-2 bg-blue-600 text-gray-100";
const notActiveStyle = "px-4 py-2 flex items-center  gap-2 hover:bg-blue-100";

const MemberSidebar = () => {
  const [actived, setActived] = useState([]);
  const { current } = useSelector((state) => state.user);
  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === tabID))
      setActived((prev) => prev.filter((el) => el !== tabID));
    else setActived((prev) => [...prev, tabID]);
  };
  return (
    <div className="bg-white h-full py-4 w-[280px] flex-none">
      <div className="w-full flex flex-col items-center justify-center py-4">
        <img
          src={current?.avatar || avatar}
          alt="logo"
          className="w-16 h-16 object-cover rounded-full"
        />
        <small className="">{`${current?.lastname} ${current.firstname}`}</small>
      </div>
      <div className="text-black">
        {memberSidebar?.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                className={({ isActive }) =>
                  clsx(isActive && activeStyle, !isActive && notActiveStyle)
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
                className="flex flex-col "
              >
                <div className="flex items-center justify-between px-4 py-2 hover:bg-blue-100 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {actived.some((id) => id === el.id) ? (
                    <AiOutlineCaretRight />
                  ) : (
                    <AiOutlineCaretDown />
                  )}
                </div>
                {actived.some((id) => +id === +el.id) && (
                  <div className="flex flex-col ">
                    {el.submenu.map((item) => (
                      <NavLink
                        key={item.text}
                        to={item.path}
                        onClick={(e) => e.stopPropagation()}
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
         <NavLink className={clsx(notActiveStyle)} to={"/"}><TbArrowForwardUp size={18} />Trang chủ</NavLink>
      </div>
    </div>
  );
};
export default memo(MemberSidebar);

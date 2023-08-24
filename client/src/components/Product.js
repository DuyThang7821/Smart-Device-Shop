import React, {useState} from "react";
import { formatMoney } from "../ultils/helpers";
import label from "../assets/new.png";
import trending from "../assets/trending.png";
import {SelectOption} from './'
import { renderStarFromNumber } from "../ultils/helpers";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";

const { BsFillSuitHeartFill, AiFillEye, AiOutlineMenu} = icons
const Product = ({ productData, isNew }) => {
const [isShowOption, setIshowOption] = useState(false);
  return (
    <div className="w-full text-base px-[10px]  ">
      <Link 
      className="w-full border p-[15px] flex flex-col items-center rounded-md"
      to={`/${path.DETAIL_PRODUCT}/${productData?._id}/${productData?.title}`}
      onMouseEnter={e => {
        e.stopPropagation()
        setIshowOption(true)
      }}
      onMouseLeave={e => {
        e.stopPropagation()
        setIshowOption(false)
      }}
      >
        <div className="w-full relative">
          {isShowOption && <div className="absolute bottom-[8px] left-0 right-0 flex justify-center gap-2 animate-slide-top"
          >
            <SelectOption icons={<AiFillEye />} />
            <SelectOption icons={<AiOutlineMenu />} />
            <SelectOption icons={<BsFillSuitHeartFill />} />

          </div>}
        <img
          src={
            productData?.thumb ||
            "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
          }
          alt=""
          className="w-[274px] h-[274px] object-cover"
        />
        <img src={isNew ? label : trending} alt="" className={`absolute w-[100px] h-[30px] top-0 right-[0] object-cover`}/>
   
        </div>
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
        <span className="flex h-4">{renderStarFromNumber(productData?.totalRatings)?.map((el,index)=>(
          <span key={index}>{el}</span>
        ))}</span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </Link>
    </div>
  );
};
export default Product;

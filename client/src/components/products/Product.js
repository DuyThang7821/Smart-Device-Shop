import React, {useState, memo} from "react";
import { formatMoney } from "../../ultils/helpers";
import label from "assets/new.png";
import trending from "assets/trending.png";
import {SelectOption} from 'components'
import { renderStarFromNumber } from "../../ultils/helpers";
import icons from "../../ultils/icons";
import WithBaseComponent from "hocs/withBaseComponent";
import { showModal } from "store/app/appSlice";
import { DetailProduct } from "pages/public";

const { BsFillSuitHeartFill, AiFillEye, AiOutlineMenu} = icons
const Product = ({ productData, isNew, normal, navigate, dispatch }) => {
const [isShowOption, setIshowOption] = useState(false);

const handleClickOptions = (e, flag) =>{
  e.stopPropagation()
  if(flag === 'MENU') navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)
  if(flag === 'WISHLIST') console.log('WISHLIST')
  if(flag === 'QUICK_VIEW') {
    dispatch(showModal({isShowModal: true, modalChildren: <DetailProduct data={{pid: productData?._id, category:productData?.category}} isQuickView />}))
  }
}
  return (
    <div className="w-full text-base px-[10px]">
      <div 
      className="w-full border p-[15px] flex flex-col items-center rounded-md"
      onClick={e => navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)}
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
          <span onClick={(e) => handleClickOptions(e,'QUICK_VIEW')}><SelectOption   icons={<AiFillEye />} /></span>
          <span onClick={(e) => handleClickOptions(e,'MENU')}> <SelectOption icons={<AiOutlineMenu />} /></span>
          <span onClick={(e) => handleClickOptions(e,'WISHLIST')}> <SelectOption  icons={<BsFillSuitHeartFill />} /></span>

          </div>}
        <img
          src={
            productData?.thumb ||
            "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
          }
          alt=""
          className="w-[274px] h-[274px] object-cover"
        />
        {!normal && <img src={isNew ? label : trending} alt="" className={`absolute w-[100px] h-[30px] top-0 right-[0] object-cover`}/>}
   
        </div>
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
        <span className="flex h-4">{renderStarFromNumber(productData?.totalRatings)?.map((el,index)=>(
          <span key={index}>{el}</span>
        ))}</span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};
export default WithBaseComponent(memo(Product));

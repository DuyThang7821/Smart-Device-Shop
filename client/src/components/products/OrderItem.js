import SelectQuantity from "components/common/SelectQuantity";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "ultils/helpers";
import { updateCart } from "store/user/userSlice";
import WithBaseComponent from "hocs/withBaseComponent";
const OrderItem = ({ el,defaultQuantity = 1 , dispatch}) => {
  const [quantity, setQuantity] = useState(() => defaultQuantity);
  const handleQuantity = (number) => {
    if (+number > 1) setQuantity(number);
  };

  const handleChangeQuantity = (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") setQuantity((prev) => +prev - 1);
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    }
  useEffect(()=>{
    dispatch(updateCart({pid: el.product?._id, quantity, color: el.color}))


  },[quantity])
  return (
    <div className="w-main border-b mx-auto font-bold  py-3 grid grid-cols-10">
      <span className="col-span-6 w-full text-center">
        <div className="flex gap-2 px-4 py-3">
          <img
            src={el.thumbnail}
            alt="thumb"
            className="w-28 h-28 object-cover"
          />
          <div className="flex flex-col items-start gap-1">
            <span className="font-bold text-sm">{el.title}</span>
            <span className="text-[10px] font-main">{el.color}</span>
          </div>
        </div>
      </span>
      <span className="col-span-1 w-full text-center">
        <div className="flex items-center h-full">
          <SelectQuantity
            quantity={quantity}
            handleQuantity={handleQuantity}
            handleChangeQuantity={handleChangeQuantity}
          />
        </div>
      </span>
      <span className="col-span-3 w-full h-full flex items-center justify-center text-center">
        <span className="text-lg">{formatMoney(el.price * quantity) + " VND"}</span>
      </span>
    </div>
  );
};
export default WithBaseComponent(OrderItem);

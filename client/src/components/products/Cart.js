import Button from "components/buttons/Button";
import WithBaseComponent from "hocs/withBaseComponent";
import React, { memo } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { showCart } from "store/app/appSlice";
import { formatMoney } from "ultils/helpers";
import { ImBin } from "react-icons/im";
import { apiRemoveCart } from "apis";
import { getCurrent } from "store/user/asyncActions";
import { toast } from "react-toastify";
import path from "ultils/path";

const Cart = ({ dispatch, navigate }) => {
  const { currentCart } = useSelector((state) => state.user);
  const removeCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response.success) {
      dispatch(getCurrent());
    } else toast.error(response.mes);
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="p-6 w-[500px] h-screen  bg-black grid grid-rows-10 text-white"
    >
      <header className="row-span-1 h-full border-b border-gray-400 flex items-center justify-between font-bold text-2xl">
        <span>Giỏ hàng của bạn</span>
        <span
          onClick={() => dispatch(showCart())}
          className="cursor-pointer p-2"
        >
          <AiFillCloseCircle size={24} />
        </span>
      </header>
      <section className="row-span-7 flex flex-col gap-3 h-full max-h-full overflow-y-auto py-3">
        {!currentCart && (
          <span className="text-xs italic">Giỏ hàng của bạn đang trống</span>
        )}
        {currentCart &&
          currentCart?.map((el) => (
            <div key={el._id} className="flex justify-between items-center ">
              <div className="flex gap-2">
                <img
                  src={el.thumbnail}
                  alt="thumb"
                  className="w-16 h-16 object-cover"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm text-yellow-300">
                    {el.title}
                  </span>
                  <span className="text-[10px]">{el.color}</span>
                  <span className="text-[10px]">{`Quantity: ${el.quantity}`}</span>
                  <span className="text-sm">
                    {formatMoney(el.price) + " VND"}
                  </span>
                </div>
              </div>
              <span
                onClick={() => removeCart(el?.product?._id, el.color)}
                className="h-8 w-8  flex items-center justify-center rounded-full hover:bg-red-500 cursor-pointer"
              >
                <ImBin size={20} />
              </span>
            </div>
          ))}
      </section>
      <div className="row-span-2 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between pt-4 border-t">
          <span>Tổng tiền:</span>
          <span>
            {formatMoney(
              currentCart?.reduce(
                (sum, el) => sum + Number(el?.price) * el.quantity,
                0
              )
            ) + " VND"}
          </span>
        </div>
        <span className="text-centetext-white italic text-xs">
        Vận chuyển, thuế và giảm giá được tính khi thanh toán.
        </span>
        <Button handleOnClick={() => {
          dispatch(showCart())
          navigate(`/${path.MEMBER}/${path.DETAIL_CART}`)
        }} style="rounded-md w-full bg-main py-3">Vào giỏ hàng</Button>
      </div>
    </div>
  );
};
export default WithBaseComponent(memo(Cart));

import { Breadcrumb, Button } from "components";
import OrderItem from "components/products/OrderItem";
import WithBaseComponent from "hocs/withBaseComponent";
import React from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "ultils/helpers";

const DetailCart = ({ location }) => {
  const { currentCart } = useSelector((state) => state.user);

  return (
    <div className="w-full">
      <div className="h-[81px]  bg-gray-100 flex justify-center items-center">
        <div className="w-main">
          <h3 className="font-semibold uppercase">My Cart</h3>
          <Breadcrumb category={location?.pathname} />
        </div>
      </div>

      <div className="flex flex-col border w-main mx-auto my-8">
        <div className="w-main mx-auto bg-blue-500 text-white font-bold py-3  grid grid-cols-10">
          <span className="col-span-6 w-full text-center">Product</span>
          <span className="col-span-1 w-full text-center">Quantity</span>
          <span className="col-span-3 w-full text-center">Price</span>
        </div>

        {currentCart?.map((el) => (
            <OrderItem 
            defaultQuantity={el.quantity}
            key={el._id} 
            el={el}
           />
        ))}
      </div>
      <div className="w-main mx-auto flex flex-col mb-12 justify-center items-end gap-3">
          <span className="flex items-center gap-8 text-sm">
            <span>Subtotal: </span>
            <span className="text-main font-bold text-2xl">{`${formatMoney(currentCart?.reduce((sum,el)=> +el?.price * el.quantity + sum, 0))} VND`}</span>
          </span>
          <span className="text-xs italic">lorem abcdddsadas</span>
          <Button>Checkout</Button>
      </div>
    </div>
  );
};
export default WithBaseComponent(DetailCart);

import { Breadcrumb, Button } from "components";
import OrderItem from "components/products/OrderItem";
import WithBaseComponent from "hocs/withBaseComponent";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatMoney } from "ultils/helpers";
import path from "ultils/path";

const DetailCart = ({ location }) => {
  const { currentCart } = useSelector((state) => state.user);

  return (
    <div className="w-full">
      <div className="h-[81px]  bg-gray-100 flex justify-center items-center">
        <div className="w-main">
          <h3 className="font-semibold uppercase text-2xl">My Cart</h3>
          {/* <Breadcrumb
            category={location?.pathname
              ?.replace("/", "")
              ?.split("-")
              ?.join(" ")}
          /> */}
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
            dfQuantity={el.quantity}
            color={el.color}
            key={el._id}
            title={el.title}
            thumbnail={el.thumbnail}
            price={el.price}
            pid={el.product?._id}
          />
        ))}
      </div>
      <div className="w-main mx-auto flex flex-col mb-12 justify-center items-end gap-3">
        <span className="flex items-center gap-8 text-sm">
          <span>Subtotal: </span>
          <span className="text-main font-bold text-2xl">{`${formatMoney(
            currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0)
          )} VND`}</span>
        </span>
        <span className="text-xs italic">lorem abcdddsadas</span>
        <Link target="_blank" className="bg-main text-white px-4 py-2 rounded-md" to={`/${path.CHECKOUT}`}>Checkout</Link>
      </div>
    </div>
  );
};
export default WithBaseComponent(DetailCart);

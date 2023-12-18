import { Breadcrumb, Button } from "components";
import OrderItem from "components/products/OrderItem";
import WithBaseComponent from "hocs/withBaseComponent";
import React from "react";
import { useSelector } from "react-redux";
import { Link, createSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { formatMoney } from "ultils/helpers";
import path from "ultils/path";

const DetailCart = ({ location, navigate }) => {
  const { currentCart, current } = useSelector((state) => state.user);
  const handleSubmit = () => {
    if(!current?.address) return Swal.fire({
      icon: 'info',
      title: 'Almost',
      text: 'Please update your address before checkout',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Go update',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if(result.isConfirmed) navigate({
        pathname: `/${path.MEMBER}/${path.PERSONAL}`,
        search: createSearchParams({redirect: location.pathname}).toString()
      })
    })
    else window.open(`/${path.CHECKOUT}`, '_blank')
    
  }
  return (
    <div className="w-full">
      <div className="h-[81px]  bg-gray-100 flex justify-center items-center">
        <div className="w-main">
          <h3 className="font-semibold uppercase text-2xl">Giỏ hàng của tôi</h3>
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
          <span className="col-span-6 w-full text-center">Sản phẩm</span>
          <span className="col-span-1 w-full text-center">Số lượng</span>
          <span className="col-span-3 w-full text-center">Giá tiền</span>
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
        <span className="text-xs italic"></span>
        <Button handleOnClick={handleSubmit}>Thanh toán</Button>
      </div>
    </div>
  );
};
export default WithBaseComponent(DetailCart);

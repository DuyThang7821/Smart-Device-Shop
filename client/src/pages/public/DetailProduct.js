import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct } from "../../apis";
import { Breadcrumb, Button, SelectQuantity} from "../../components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import {formatMoney, formatPrice, renderStarFromNumber } from '../../ultils/helpers'
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const DetailProduct = () => {
  const { pid, title, category } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response?.success) setProduct(response.productData);
  };
  useEffect(() => {
    if (pid) fetchProductData();
  }, [pid]);

  const handleQuantity = useCallback((number) =>{
    let previous
        if (!Number(number) || Number(number) < 1) {
             return
            
        }else {
            setQuantity(number)
            
        } 
        
  },[quantity])
  const handleChangeQuantity = useCallback((flag) =>{
    if(flag === 'minus' && quantity === 1) return
    if(flag === 'minus') setQuantity(prev => +prev -1)
    if(flag === 'plus') setQuantity(prev => +prev +1)
  }, [quantity])
  return (
    <div className="w-full">
      <div className="h-[81px]  bg-gray-100 flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold">{title}</h3>
          <Breadcrumb title={title} category={category} />
        </div>
      </div>
      <div className="w-main m-auto mt-4 flex">
        <div className="flex flex-col gap-4 w-2/5">
          <div className="h-[458px] w-[458px] border">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: product?.thumb,
                },
                largeImage: {
                  src: product?.thumb,
                  width: 1000,
                  height: 900,
                },
              }}
            />
          </div>

          <div className="w-[458px]">
            <Slider className="image-slider" {...settings}>
              {product?.images?.map((el) => (
                <div key={el} className="px-2">
                  <img
                    src={el}
                    alt="sub-product"
                    className="border h-[153px] w-[153px] object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="w-2/5 pr-[24px] flex flex-col gap-4">
            <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[30px]">{`${formatMoney(formatPrice(product?.price))} VND`}</h2>
            <span className="text-sm text-main">{`Kho: ${product?.quantity}`}</span>
            </div>
            <div className="flex items-center gap-1">
                {renderStarFromNumber(product?.totalRatings)?.map((el, index) =>(<span key={index}>{el}</span>))}
                <span className="text-main text-sm italic">{`(Đã bán: ${product?.sold} cái)`}</span>
            </div>
            <ul className=" list-square pl-5 text-sm text-gray-600">
                {product?.description?.map(el =>(<li className="leading-6" key={el}>{el}</li>))}
            </ul>
            <div className="flex flex-col gap-8">
                <SelectQuantity
                 quantity={quantity} 
                 handleQuantity={handleQuantity}
                 handleChangeQuantity={handleChangeQuantity} />
                <Button fw>
                    Add to cart
                </Button>
            </div>
        </div>

        <div className="border border-blue-300 w-1/5">Infomation</div>
      </div>
      <div className="h-[500px] w-full"></div>
    </div>
  );
};
export default DetailProduct;

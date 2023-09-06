import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts } from "../../apis";
import {
  Breadcrumb,
  Button,
  ProductExtraInfoItem,
  SelectQuantity,
  ProductInfomation,
  CustomSlider
} from "../../components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { productExtraInfomation } from "../../ultils/contants";
import {
  formatMoney,
  formatPrice,
  renderStarFromNumber,
} from "../../ultils/helpers";
import DOMPurify from "dompurify";
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const DetailProduct = () => {
  const [currentImage, setCurrentImage] = useState(null)
  const { pid, title, category } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [update, setUpdate] = useState(false);
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response?.success) {
      setProduct(response.productData);
      setCurrentImage(response?.productData?.thumb)
    }
  };

  const fetchProducts = async () =>{
    const response = await apiGetProducts({category});
    if (response?.success) setRelatedProducts(response?.products);
  }
  useEffect(() => {
    if (pid) {
      fetchProductData()
      fetchProducts()
    };
    window.scroll(0, 0);
  }, [pid]);

  useEffect(() => {
    if (pid) fetchProductData()
}, [update]);

  const rerender = useCallback(()=>{
    setUpdate(!update)
  }, [update])

  const handleQuantity = useCallback(
    (number) => {
      
      if (!Number(number) || Number(number) < 1) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity]
  );
  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") setQuantity((prev) => +prev - 1);
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );
  const handleClickImage = (e, el) =>{
    e.stopPropagation();
    setCurrentImage(el)
  }
  return (
    <div className="w-full">
      <div className="h-[81px]  bg-gray-100 flex justify-center items-center">
        <div className="w-main">
          <h3 className="font-semibold">{title}</h3>
          <Breadcrumb title={title} category={category} />
        </div>
      </div>
      <div className="w-main m-auto mt-4 flex">
        <div className="flex flex-col gap-4 w-2/5">
          <div className="h-[458px] w-[458px] border overflow-hidden">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: currentImage,
                },
                largeImage: {
                  src: currentImage,
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
                    onClick={e => handleClickImage(e, el)}
                    src={el}
                    alt="sub-product"
                    className="cursor-pointer border h-[143px] w-[143px] object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="w-2/5 pr-[24px] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[30px]">{`${formatMoney(
              formatPrice(product?.price)
            )} VND`}</h2>
            <span className="text-sm text-main">{`Kho: ${product?.quantity}`}</span>
          </div>
          <div className="flex items-center gap-1">
            {renderStarFromNumber(product?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            <span className="text-main text-sm italic">{`(Đã bán: ${product?.sold} cái)`}</span>
          </div>
          <ul className=" list-square pl-5 text-sm text-gray-600">
            {product?.description?.length > 1 && product?.description?.map((el) => (
              <li className="leading-6" key={el}>
                {el}
              </li>
            ))}
            {product?.description?.length === 1 && <div className="text-sm" dangerouslySetInnerHTML = {{__html: DOMPurify.sanitize(product?.description[0]) }}></div>}
          </ul>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity</span>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
              />
              
            </div>
            <Button fw>Add to cart</Button>
          </div>
        </div>

        <div className="w-1/5">
          {productExtraInfomation.map((el) => (
            <ProductExtraInfoItem
              key={el.id}
              title={el.title}
              icon={el.icon}
              sub={el.sub}
            />
          ))}
        </div>
      </div>
      <div className="w-main m-auto mt-8">
        <ProductInfomation 
        totalRatings = {product?.totalRatings} 
        ratings={product?.ratings} 
        nameProduct={product?.title}
        pid={product?._id}
        rerender={rerender} />
      </div>

      <div className="w-main m-auto mt-8">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-4 border-main">OTHER CUSTOMER ALSO LIKED</h3>
            <CustomSlider normal={true} products={relatedProducts} />
      </div>
      <div className="h-[200px] w-full"></div>
    </div>
  );
};
export default DetailProduct;

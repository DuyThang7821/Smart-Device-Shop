import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts } from "../../apis";
import {
  Breadcrumb,
  Button,
  ProductExtraInfoItem,
  SelectQuantity,
  ProductInfomation,
  CustomSlider,
} from "../../components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { productExtraInfomation } from "../../ultils/contants";
import {
  formatMoney,
  formatPrice,
  renderStarFromNumber,
  validate,
} from "../../ultils/helpers";
import DOMPurify from "dompurify";
import clsx from "clsx";
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const DetailProduct = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const { pid, category } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [update, setUpdate] = useState(false);
  const [varriant, setVarriant] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    thumb: "",
    images: [],
    price: "",
    color: ''
  });
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response?.success) {
      setProduct(response.productData);
      setCurrentImage(response?.productData?.thumb);
    }
  };
  useEffect(() => {
    if (varriant) {
      setCurrentProduct({
        title: product?.varriant?.find((el) => el.sku === varriant)?.title,
        color: product?.varriant?.find((el) => el.sku === varriant)?.color,
        images: product?.varriant?.find((el) => el.sku === varriant)?.images,
        price: product?.varriant?.find((el) => el.sku === varriant)?.price,
        thumb: product?.varriant?.find((el) => el.sku === varriant)?.thumb,
      });
    }
  });
  const fetchProducts = async () => {
    const response = await apiGetProducts({ category });
    if (response?.success) setRelatedProducts(response?.products);
  };
  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
    window.scroll(0, 0);
  }, [pid]);

  useEffect(() => {
    if (pid) fetchProductData();
  }, [update]);

  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

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
  const handleClickImage = (e, el) => {
    e.stopPropagation();
    setCurrentImage(el);
  };
  return (
    <div className="w-full">
      <div className="h-[81px]  bg-gray-100 flex justify-center items-center">
        <div className="w-main">
          <h3 className="font-semibold">
            {currentProduct?.title || product?.title}
          </h3>
          <Breadcrumb
            title={currentProduct?.title || product?.title}
            category={category}
          />
        </div>
      </div>
      <div className="w-main m-auto mt-4 flex">
        <div className="flex flex-col gap-4 w-2/5">
          <div className="h-[458px] w-[458px] border flex items-center overflow-hidden">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: currentProduct.thumb || currentImage,
                },
                largeImage: {
                  src: currentProduct.thumb || currentImage,
                  width: 1000,
                  height: 900,
                },
              }}
            />
          </div>

          <div className="w-[458px]">
            <Slider className="image-slider" {...settings}>
              {currentProduct?.images.length === 0 &&
                product?.images?.map((el) => (
                  <div key={el} className="px-2">
                    <img
                      onClick={(e) => handleClickImage(e, el)}
                      src={el}
                      alt="sub-product"
                      className="cursor-pointer border h-[143px] w-[143px] object-cover"
                    />
                  </div>
                ))}

              {currentProduct?.images.length > 0 &&
                currentProduct?.images?.map((el) => (
                  <div key={el} className="px-2">
                    <img
                      onClick={(e) => handleClickImage(e, el)}
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
              formatPrice(currentProduct?.price || product?.price)
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
            {product?.description?.length > 1 &&
              product?.description?.map((el) => (
                <li className="leading-6" key={el}>
                  {el}
                </li>
              ))}
            {product?.description?.length === 1 && (
              <div
                className="text-sm line-clamp-[10]"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description[0]),
                }}
              ></div>
            )}
          </ul>
          <div className="my-4 flex gap-4">
            <span className="font-bold">Color:</span>
            <div className="flex flex-wrap gap-4 items-center w-full">
              <div
                onClick={() => setVarriant(null)}
                className={clsx(
                  "flex items-center gap-2 p-2 border cursor-pointer",
                  !varriant && "border-red-500"
                )}
              >
                <img
                  src={product?.thumb}
                  alt="thumb"
                  className="w-8 h-8 rounded-md object-cover"
                />
                <span className="flex flex-col">
                  <span>{product?.color}</span>
                  <span>{product?.price}</span>
                </span>
              </div>
              {product?.varriant?.map((el) => (
                <div
                  onClick={() => setVarriant(el.sku)}
                  className={clsx(
                    "flex items-center gap-2 p-2 border cursor-pointer",
                    varriant === el.sku && "border-red-500"
                  )}
                >
                  <img
                    src={el?.thumb}
                    alt="thumb"
                    className="w-8 h-8 rounded-md object-cover"
                  />
                  <span className="flex flex-col">
                    <span>{el?.color}</span>
                    <span>{el?.price}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
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
          totalRatings={product?.totalRatings}
          ratings={product?.ratings}
          nameProduct={product?.title}
          pid={product?._id}
          rerender={rerender}
        />
      </div>

      <div className="w-main m-auto mt-8">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-4 border-main">
          OTHER CUSTOMER ALSO LIKED
        </h3>
        <CustomSlider normal={true} products={relatedProducts} />
      </div>
      <div className="h-[200px] w-full"></div>
    </div>
  );
};
export default DetailProduct;

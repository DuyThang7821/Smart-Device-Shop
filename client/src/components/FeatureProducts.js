import React, { useEffect, useState } from "react";
import { ProductCard } from "./";
import { apiGetProducts } from "../apis";
const FeatureProducts = () => {
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9, totalRatings: 5 });
    if (response.success) setProducts(response.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-4 border-main">
        FEATURED PRODUCTS
      </h3>
      <div className=" flex flex-wrap mt-[15px] mx-[-10px] ">
        {products?.map((el) => (
          <ProductCard
            key={el.id}
            image={el.thumb}
            title={el.title}
            totalRatings={el.totalRatings}
            price={el.price}
          />
        ))}
      </div>
      <div className="flex justify-between ">
  <img
    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
    alt=""
    className="w-[49%] object-contain "
  />
  <div className="flex flex-col justify-between gap-4 w-[24%]">
    <img
      src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
      alt=""
      className="h-[calc(50% - 2px)]"
    />

    <img
      src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
      alt=""
      className="h-[calc(50% - 2px)]" 
    />
  </div>
  <img
    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
    alt=""
    className="w-[24%] object-contain"
  />
</div>

    </div>
  );
};
export default FeatureProducts;

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Breadcrumb, Product, SearchItem } from "../../components";
import { apiGetProducts } from "../../apis";
import Masonry from "react-masonry-css";
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const [products, setProducts] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams()
  console.log(params)
  const fetchProductsByCategory = async (queries) => {
    const response = await apiGetProducts(queries);
    if (response.success) setProducts(response.products);
  };
  const { category } = useParams();
  useEffect(() => {
    let param = []
    for (let i of params.entries()) param.push(i)
    const queries = {}
    for(let i of params) queries[i[0]] = i[1]
    
    fetchProductsByCategory(queries);
  }, [params]);
  const changeActiveFilter = useCallback((name) => {
    if(activeClick === name) setActiveClick(null);
    else setActiveClick(name)
  }, [activeClick]);
  return (
    <div className="w-full">
      <div className="h-[81px]  bg-gray-100 flex justify-center items-center">
        <div className="w-main">
          <h3 className="font-semibold uppercase">{category}</h3>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className="w-main border p-4 justify-between mt-8 flex m-auto rounded-md">
        <div className="w-4/5 flex-auto flex flex-col gap-3">
          <span className="font-semibold text-sm">Filter by</span>
          <div className="flex items-center gap-4">
            <SearchItem
              name="price"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type="input"
            />

            <SearchItem
              name="color"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
            />
          </div>
        </div>

        <div className="w-1/5 flex">Sort by</div>
      </div>
      <div className="mt-8 w-main m-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex mx-[-10px]"
          columnClassName="my-masonry-grid_column"
        >
          {products?.map((el) => (
            <Product key={el._id} pid={el.id} productData={el} normal={true} />
          ))}
        </Masonry>
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};
export default Products;

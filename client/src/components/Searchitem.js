import React, { memo, useEffect, useState } from "react";
import icons from "../ultils/icons";
import { colors } from "../ultils/contants";
import { apiGetProducts } from "../apis";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import path from "../ultils/path";
import useDebounce from '../hooks/useDebounce'
const { AiOutlineDown } = icons;
const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const { category } = useParams();
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });
  const [bestPrice, setBestPrice] = useState(null);
  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl)
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
    changeActiveFilter(null);
  };
  const fetchBestPriceProduct = async () => {
    const response = await apiGetProducts({ sort: "-price", limit: "1" });
    if (response?.success) setBestPrice(response.products[0]?.price);
  };
  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.join(","),
        }).toString(),
      });
    } else {
      navigate(`/${category}`);
    }
  }, [selected]);
  useEffect(() => {
    if (type === "input") fetchBestPriceProduct();
  }, [type]);

  // useEffect(()=>{
  //   if(price.from > price.to) alert('From price cannot be greater than To price')
  // },[price])
  const debouncePriceFrom = useDebounce(price.from, 500)
  const debouncePriceTo = useDebounce(price.to, 500)
  useEffect(() => {
    
    const data = {};
    if (Number(price.from) > 0) data.from = price.from;
    if (Number(price.to) > 0) data.to = price.to;

    navigate({
      pathname: `/${category}`,
      search: createSearchParams(data).toString(),
    });
  }, [debouncePriceFrom, debouncePriceTo]);
  return (
    <div
      onClick={() => changeActiveFilter(name)}
      className="cursor-pointer rounded-md gap-6 text-sm p-3 relative border border-gray-300 flex justify-center items-center bg-blue-600 text-white"
    >
      <span className="capitalize">{name}</span>
      <AiOutlineDown />
      {activeClick === name && (
        <div className="z-10 absolute top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white text-black min-w-[150px]">
          {type === "checkbox" && (
            <div className="">
              <div className="p-4 items-center flex justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                  }}
                  className="cursor-pointer underline hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-3 mt-4"
              >
                {colors.map((el, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      value={el}
                      onChange={handleSelect}
                      id={el}
                      checked={selected.some(
                        (selectedItem) => selectedItem === el
                      )}
                      className="form-checkbox"
                    />
                    <label className="capitalize text-gray-700" htmlFor={el}>
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="p-4 items-center flex justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`The highest price is ${Number(
                  bestPrice
                ).toLocaleString()} VNDDefault input value is USD`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrice({from: '' , to: ''});
                    changeActiveFilter(null)
                  }}
                  className="cursor-pointer underline hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="from">From</label>
                  <input
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                    className="form-input"
                    type="number"
                    id="from"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="to">To</label>
                  <input
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                    className="form-input"
                    type="number"
                    id="to"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default memo(SearchItem);

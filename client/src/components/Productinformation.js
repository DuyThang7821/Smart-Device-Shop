import React, {memo, useEffect, useState} from "react";
import { productInfoTabs } from "../ultils/contants"; 
const activedStyles = ''
const notActiveStyles = ''
const tabs = ['DESCRIPTION', 'WARRANTY', 'DELIVERY', 'PAYMENT', 'CUSTOMER REVIEW']
const ProductInfomation = () =>{
    const [activedTab, setActiveTab] = useState(1)
    return(
        <div>
            <div className=" items-center gap-2 relative bottom-[-1px]">
                {productInfoTabs.map(el =>(
                    <span className={`py-2 px-4 cursor-pointer ${activedTab === +el.id ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
                    key={el.id}
                    onClick={() => setActiveTab(el.id)}
                    >{el.name}</span>
                ))}
            </div>
            <div className=" border p-4">
                    {productInfoTabs.some(el => el.id === activedTab) && productInfoTabs.find(el => el.id === activedTab)?.content}
            </div>
        </div>
    )
}
export default memo(ProductInfomation)
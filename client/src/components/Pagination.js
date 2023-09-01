import React from "react";
import usePagination from "../hooks/usePagination";
import {PagiItem} from './'
const Pagination = ({totalCount}) =>{
    const pagination = usePagination(66, 2)
    return(
        <div className="flex items-center">
            {pagination?.map(el => (
                <PagiItem key={el}>
                    {el}
                </PagiItem>
            ))}
        </div>
    )
}
export default Pagination
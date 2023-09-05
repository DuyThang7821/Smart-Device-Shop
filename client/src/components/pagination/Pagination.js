import React, { useEffect , memo} from "react";
import usePagination from "../../hooks/usePagination";
import { PagiItem } from "..";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, params.get('page' || 1));


  const range = () =>{
    const currentPage = +params.get('page');
    const pageSize = +process.env.REACT_APP_LIMIT || 10;
    const start = ((currentPage - 1) * pageSize) + 1;
    const end = Math.min(currentPage * pageSize, totalCount)

    return `${start} - ${end}`
  }
  return (
    <div className="flex w-full justify-between items-center">
      {!+params.get("page") ? <span className="text-sm italic">{`Show products 1 - ${Math.min(+process.env.REACT_APP_LIMIT, totalCount) || 10} of ${totalCount}`}</span> : ''}
      {+params.get("page") ? <span className="text-sm italic">
    {`Show products ${range()} of ${totalCount}`}</span>: ''}
      <div className="flex items-center">
        {pagination?.map((el) => (
          <PagiItem key={el}>{el}</PagiItem>
        ))}
      </div>
    </div>
  );
};
export default memo(Pagination);

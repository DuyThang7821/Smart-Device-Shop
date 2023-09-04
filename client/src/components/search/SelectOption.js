import React,{memo} from "react";


const SelectOption = ({icons}) => {
  return (
    <div className="w-10 h-10 bg-white rounded-full border shadow-md flex items-center justify-center hover:bg-blue-500 hover:text-white cursor-pointer hover:border-blue-500">{icons}</div>
  );
};
export default memo(SelectOption);

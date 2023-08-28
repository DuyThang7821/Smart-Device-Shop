import React, {useState} from "react";
import { Button } from "../../components";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis/user";
import {toast} from "react-toastify"
const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const {token} = useParams()
    
    const handleResetPassword = async() =>{
        const response = await apiResetPassword({password, token})
        if(response?.success){
            toast?.success(response?.mes, {theme: 'light'})
          }else toast.error(response?.mes, {theme: 'light'});
    }
  return (
    <div className="animate-slide-right absolute top-0 left-0 bottom-0 right-0 bg-gray-100 z-50 items-center flex flex-col py-8">
      <div className="flex flex-col gap-4">
        <label htmlFor="password">Nhập mật khẩu mới:</label>
        <input
          type="password"
          id="password"
          className="w-[800px] pb-2 p-4 border-bottom outline-none placeholder:text-sm"
          placeholder="type here"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-end  w-full gap-4">
          <Button
            name="Gửi"
            handleOnClick={handleResetPassword}
            style="px-4 py-2 rounded-md text-white bg-green-500 text-semibold my-2"
          />
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;

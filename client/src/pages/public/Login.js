import React, { useState, useCallback } from "react";
import { InputField, Button } from "../../components";
import { apiRegister, apiLogin } from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import {register} from '../../store/user/userSlice';
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: ''
  });
  const [isRegister, setIsRegister] = useState(false);
  const resetPayload = () => {
    setPayload({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      mobile: '',
    });
  };
  
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    
    if (isRegister) {
      const response = await apiRegister(payload);
      
      if (response.success) {
        Swal.fire('Congratulation', response.mes, 'success').then(() => {
          setIsRegister(false);
          resetPayload();
        });
      } else  Swal.fire('Oops!', response.mes, 'error');
      
    } else {
      const rs = await apiLogin(data)
      if (rs.success) {
        dispatch(register({isLoggedIn: true, token: rs.accessToken, userData: rs.userData}))
        navigate(`/${path.HOME}`)
      } else  Swal.fire('Oops!', rs.mes, 'error');
    }
  }, [payload, isRegister]);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img
        src="https://t4.ftcdn.net/jpg/04/27/86/39/360_F_427863926_mPyhfWhQX8v1JeF8Hj1X1AekchvSGdZt.jpg"
        alt=""
        className="w-full h-full object-cover absolute z-0"
      />
      <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px] relative z-10 top-[-50px]">
        <h1 className="text-[28px] font-semibold text-main mb-8">
          {isRegister ? "Register" : "Login"}
        </h1>

        {isRegister && (
          <div className="flex items-center gap-2">
            <InputField
              value={payload.firstname}
              setValue={setPayload}
              nameKey="firstname"
            />
            <InputField
              value={payload.lastname}
              setValue={setPayload}
              nameKey="lastname"
            />
          </div>
        )}
        <InputField
          value={payload.email}
          setValue={setPayload}
          nameKey="email"
        />

          {isRegister && <InputField
          value={payload.mobile}
          setValue={setPayload}
          nameKey="mobile"
        />}

        <InputField
          value={payload.password}
          setValue={setPayload}
          nameKey="password"
          type="password"
        />

        <Button
          name={isRegister ? "Register" : "Login"}
          handleOnClick={handleSubmit}
          fw
        />
        <div className="flex items-center justify-between my-2 w-full text-sm">
          {!isRegister && (
            <span className="text-blue-500 hover:underline cursor-pointer">
              Forgot your account?
            </span>
          )}
          {!isRegister && (
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => setIsRegister(true)}
            >
              Create your account
            </span>
          )}
          {isRegister && (
            <span
              className="text-blue-500 hover:underline cursor-pointer w-full text-center"
              onClick={() => setIsRegister(false)}
            >
              Go to Login
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;

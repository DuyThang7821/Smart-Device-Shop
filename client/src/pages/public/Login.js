import React, { useState, useCallback, useEffect } from "react";
import { InputField, Button , Loading } from "components";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiFinalRegister,
} from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import path from "../../ultils/path";
import { login } from "store/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validate } from "ultils/helpers";
import {showModal} from 'store/app/appSlice'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [searchParams] = useSearchParams()
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });

    if (response?.success) {
      toast?.success(response?.mes);
    } else toast.warning(response?.mes);
  };
  useEffect(() => {
    resetPayload();
  }, [isRegister]);
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);
    if (invalids === 0) {
      if (isRegister) {
        dispatch(showModal({
          isShowModal: true,
          modalChildren: <Loading />
        }))
        const response = await apiRegister(payload);
        dispatch(showModal({
          isShowModal: false,
          modalChildren: null
        }))
        if (response?.success) {
          setIsVerifiedEmail(true);
        } else Swal.fire("Oops!", response?.mes, "error");
      } else {
        const rs = await apiLogin(data);
        if (rs?.success) {
          dispatch(
            login({
              isLoggedIn: true,
              token: rs.accessToken,
              userData: rs.userData,
            })
          );
         searchParams.get('redirect') ? navigate(searchParams.get('redirect')) : navigate(`/${path.HOME}`);
        } else Swal.fire("Oops!", rs?.mes, "error");
      }
    }
  }, [payload, isRegister]);
  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response?.success) {
      Swal.fire("Đăng kí tài khoản thành công", response?.mes, "success").then(() => {
        setIsRegister(false);
        resetPayload();
      });
    } else Swal.fire("Oops!", response?.mes, "error");
    setIsVerifiedEmail(false);
    setToken("");
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      {isVerifiedEmail && (
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-overlay z-50 flex justify-center items-center">
          <div className="bg-white w-[500px] rounded-md p-8">
            <h4 className="">
              Chúng tôi đã gữi mã tới email của bạn. Vui lòng kiểm tra thư của bạn
              và nhập mã:
            </h4>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="p-2 border rounded-md outline-none"
            />
            <button
              type="button"
              className="rounded-md px-4 py-2 bg-blue-500 font-semibold text-white ml-4"
              onClick={finalRegister}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {isForgotPassword && (
        <div className="animate-slide-right absolute top-0 left-0 bottom-0 right-0 bg-gray-100 z-50 items-center flex flex-col py-8">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Nhập email của bạn:</label>
            <input
              type="text"
              id="email"
              className="w-[800px] pb-2 p-4 border-bottom outline-none placeholder:text-sm"
              placeholder="Exp: email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center justify-end  w-full gap-4">
              <Button
                className ="text-white font-semibold"
                name="Trở về"
                handleOnClick={() => setIsForgotPassword(false)}
                style="px-8 py-4 rounded-md text-white-100 bg-yellow-500 text-semibold my-2 font-semibold"
                
              />
              
              <Button
                className ="px-8 py-4 rounded-md text-white-100 bg-blue-600 text-semibold my-2"
                name="Gửi"
                handleOnClick={handleForgotPassword}
                style="px-8 py-4 rounded-md text-black bg-blue-600 text-semibold my-2"
              />
            </div>
          </div>
        </div>
      )}
      <img
        src="https://t4.ftcdn.net/jpg/04/27/86/39/360_F_427863926_mPyhfWhQX8v1JeF8Hj1X1AekchvSGdZt.jpg"
        alt=""
        className="w-full h-full object-cover absolute z-0"
      />
      <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px] relative z-10 top-[-50px]">
        <h1 className="text-[28px] font-semibold text-main mb-8">
          {isRegister ? "Đăng kí" : "Đăng nhập"}
        </h1>

        {isRegister && (
          <div className="flex items-center gap-2">
            <InputField
              value={payload.firstname}
              setValue={setPayload}
              nameKey="firstname"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            <InputField
              value={payload.lastname}
              setValue={setPayload}
              nameKey="lastname"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          </div>
        )}
        <InputField
          value={payload.email}
          setValue={setPayload}
          nameKey="email"
          type="email"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />

        {isRegister && (
          <InputField
            value={payload.mobile}
            setValue={setPayload}
            nameKey="mobile"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        )}

        <InputField
          value={payload.password}
          setValue={setPayload}
          nameKey="password"
          type="password"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />

        <Button handleOnClick={handleSubmit} fw>
          {isRegister ? "Đăng kí" : "Đăng nhập"}
        </Button>

        <div className="flex items-center justify-between my-2 w-full text-sm">
          {!isRegister && (
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => setIsForgotPassword(true)}
            >
              Quên mật khẩu?
            </span>
          )}
          {!isRegister && (
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => setIsRegister(true)}
            >
              Tạo tài khoản
            </span>
          )}
          {isRegister && (
            <span
              className="text-blue-500 hover:underline cursor-pointer w-full text-center"
              onClick={() => setIsRegister(false)}
            >
              Đi đến đăng nhập
            </span>
          )}
        </div>
        <Link
          className="text-blue-500 text-sm hover:underline cursor-pointer"
          to={`/${path.HOME}`}
        >
          Trở lại trang chủ
        </Link>
      </div>
    </div>
  );
};
export default Login;

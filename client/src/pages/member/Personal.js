import { Button } from "components";
import InputForm from "components/inputs/inputForm";
import moment from "moment";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import avatar from "assets/avatarDefault.jpg";
import { apiUpdateCurrent } from "apis";
import { getCurrent } from "store/user/asyncActions";
import { toast } from "react-toastify";
import WithBaseComponent from "hocs/withBaseComponent";
import { useSearchParams } from "react-router-dom";

const Personal = ({navigate}) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    watch
  } = useForm();
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams()
  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      mobile: current?.mobile,
      email: current?.email,
      avatar: current?.avatar,
      address: current?.address,
    });
  }, [current]);
  const handleUpdateInfor = async (data) => {
    const formData = new FormData();

    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]);

    delete data.avatar;
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    const response = await apiUpdateCurrent(formData);
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.mes);
      if (searchParams.get('redirect')) navigate(searchParams.get('redirect'))
    } else toast.error(response.mes);
  };

  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-bold py-4 border-b border-b-blue-800">
        Trang cá nhân
      </header>
      <form
        onSubmit={handleSubmit(handleUpdateInfor)}
        className="w-3/5 mx-auto py-8 flex flex-col gap-4"
      >
        <InputForm
          label="Tên của bạn"
          register={register}
          errors={errors}
          id="firstname"
          validate={{
            required: "Trường này không được để trống",
          }}
        />

        <InputForm
          label="Họ và tên đệm"
          register={register}
          errors={errors}
          id="lastname"
          validate={{
            required: "Trường này không được để trống",
          }}
        />

        <InputForm
          label="Địa chỉ email"
          register={register}
          errors={errors}
          id="email"
          validate={{
            required: "Trường này không được để trống",
            pattern: {
              value:
                /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+@[a-zA-Z\d-]+\.(com|vn)$/,
              message: "Địa chỉ email không hợp lệ",
            },
          }}
        />

        <InputForm
          label="Số điện thoại"
          register={register}
          errors={errors}
          id="mobile"
          validate={{
            required: "Trường này không được để trống",
            pattern: {
              value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
              message: "Số điện thoại không hợp lệ",
            },
          }}
        />

        <InputForm
          label="Địa chỉ"
          register={register}
          errors={errors}
          id="address"
          validate={{
            required: "Trường này không được để trống",
          }}
        />

        <div className="flex items-center gap-2">
          <span className="font-medium">Trạng thái tài khoản:</span>
          <span>{current?.isBlocked ? "Blocked" : "Actived"}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Phân quyền:</span>
          <span>{+current?.role === 1945 ? "Admin" : "User"}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Đã tạo:</span>
          <span>{moment(current?.createdAt).fromNow()}</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium">Ảnh đại diện</span>
          <label htmlFor="file">
            <img
              src={current?.avatar || avatar}
              alt="avatar"
              className="w-20 h-20 ml-8 object-cover rounded-full"
            />
          </label>
          <input type="file" id="file" {...register("avatar")} hidden />
        </div>
        {isDirty && (
          <div className="w-full flex justify-end">
            <Button type="submit">Cập nhật thông tin </Button>
          </div>
        )}
      </form>
    </div>
  );
};
export default WithBaseComponent(Personal);

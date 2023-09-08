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

const Personal = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm();
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      mobile: current?.mobile,
      email: current?.email,
      avatar: current?.avatar,
    });
  }, [current]);
  const handleUpdateInfor = async (data) => {
    const formData = new FormData();

    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]);

    delete data.avatar;
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    const response = await apiUpdateCurrent(formData)
    if(response.success) {
      dispatch(getCurrent())
      toast.success(response.mes)
    }else toast.error(response.mes)
  };
  
  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-bold py-4 border-b border-b-blue-800">
        Personal
      </header>
      <form
        onSubmit={handleSubmit(handleUpdateInfor)}
        className="w-3/5 mx-auto py-8 flex flex-col gap-4"
      >
        <InputForm
          label="Firstname"
          register={register}
          errors={errors}
          id="firstname"
          validate={{
            required: "Need fill this field",
          }}
        />

        <InputForm
          label="Lastname"
          register={register}
          errors={errors}
          id="lastname"
          validate={{
            required: "Need fill this field",
          }}
        />

        <InputForm
          label="Email address"
          register={register}
          errors={errors}
          id="email"
          validate={{
            required: "Need fill this field",
            pattern: {
              value:
                /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+@[a-zA-Z\d-]+\.(com|vn)$/,
              message: "Email invalid",
            },
          }}
        />

        <InputForm
          label="Phone"
          register={register}
          errors={errors}
          id="mobile"
          validate={{
            required: "Need fill this field",
            pattern: {
              value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
              message: "Phone in valid",
            },
          }}
        />

        <div className="flex items-center gap-2">
          <span className="font-medium">Account status:</span>
          <span>{current?.isBlocked ? "Blocked" : "Actived"}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Role:</span>
          <span>{+current?.role === 1945 ? "Admin" : "User"}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">CreatedAt:</span>
          <span>{moment(current?.createdAt).fromNow()}</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium">Profile image</span>
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
            <Button type="submit">Update Information </Button>
          </div>
        )}
      </form>
    </div>
  );
};
export default Personal;

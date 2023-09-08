import { Button } from "components";
import InputForm from "components/inputs/inputForm";
import moment from "moment";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Personal = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const {current} = useSelector(state => state.user)
  useEffect(()=>{
    reset({
        firstname: current?.firstname,
        lastname: current?.lastname,
        mobile: current?.mobile,
        email: current?.email,
        avatar: current?.avatar,

    })
  },[current])
  const handleUpdateInfor = (data) =>{
     console.log(data)
  }
  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-bold py-4 border-b border-b-blue-800">
        Personal
      </header>
      <form onSubmit={handleSubmit(handleUpdateInfor)} className="w-3/5 mx-auto py-8 flex flex-col gap-4">
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
          }}
        />
        
        <InputForm
          label="Phone"
          register={register}
          errors={errors}
          id="mobile"
          validate={{
            required: "Need fill this field",
          }}
        />

        <div className="flex items-center gap-2">
            <span className="font-medium">Account status:</span>
            <span>{current?.isBlocked ? 'Blocked' : 'Actived'}</span>
        </div>

        <div className="flex items-center gap-2">
            <span className="font-medium">Role:</span>
            <span>{+current?.role === 1945 ? 'Admin' : 'User'}</span>
        </div>

        <div className="flex items-center gap-2">
            <span className="font-medium">CreatedAt:</span>
            <span>{moment(current?.createdAt).fromNow()}</span>
        </div>
        <div className="w-full flex justify-end">
        <Button type="submit">Update Information </Button>
        </div>
      </form>
    </div>
  );
};
export default Personal;

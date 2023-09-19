import React, { useEffect, useState, useCallback } from "react";
import { apiGetUsers, apiUpdateUser , apiDeleteUser} from "apis/user";
import { blockStatus, roles } from "ultils/contants";
import { InputField, Pagination, InputForm, Select, Button } from "components";
import useDebounce from "hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";
import {toast} from 'react-toastify';
import Swal from "sweetalert2";
import clsx from "clsx";
const ManageUser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    email: "",
    firstname: "",
    lastname: "",
    role: "",
    phone: "",
    isBlocked: "",
  });
  const [users, setUsers] = useState(null);
  const [queries, setQueries] = useState({
    q: "",
  });
  const [update, setUpdate] = useState(false);
  const [editElm, setEditElm] = useState(null);
  const [params] = useSearchParams();
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response?.success) setUsers(response);
  };
  const render = useCallback(()=>{
    setUpdate(!update)
  },[update])
  const queriesDebounce = useDebounce(queries.q, 800);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) queries.q = queriesDebounce;
    fetchUsers(queries);
  }, [queriesDebounce, params, update]);
  const handleUpdate = async (data) => {
  const response = await apiUpdateUser(data, editElm._id);
    if(response?.success) {
      setEditElm(null)
      render()
      toast.success(response.mes)
    }else toast.error(response.mes)
  };
  const handleDeleteUser = async(uid) =>{
    Swal.fire({
      title: 'Are you sure',
      text: "Are you sure you want to delete user",
      showCancelButton: true
    }).then(async(result) =>{
      if(result.isConfirmed){
        const response = await apiDeleteUser(uid)
        if(response?.success){
          render()
          toast.success(response.mes)
        }else toast.error(response.mes)
      }
    })

  }

  return (
    <div className={clsx("w-full", editElm && 'pl-16')}>
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
        <span>QUẢN LÍ TÀI KHOẢN NGƯỜI DÙNG</span>
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-end py-4">
          <InputField
            nameKey={"q"}
            value={queries.q}
            setValue={setQueries}
            style={"w500"}
            placeholder="Tìm kiếm tên hoặc email..."
            isHideLabel
          />
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {editElm && <Button type="submit">Cập nhật</Button>}
          <table className="table-auto mb-6 text-left w-full">
            <thead className="font-bold bg-gray-700 text-[13px]  text-white">
              <tr className="border border-gray-500">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Địa chỉ email</th>
                <th className="px-4 py-2">Tên</th>
                <th className="px-4 py-2">Họ và tên đệm</th>
                <th className="px-4 py-2">Phân quyền</th>
                <th className="px-4 py-2">Số điện thoại</th>
                <th className="px-4 py-2">Trạng thái</th>
                <th className="px-4 py-2">Đã tạo</th>
                <th className="px-4 py-2">Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((el, idx) => (
                <tr key={el._id} className="border border-gray-500">
                  <td className="py-2 px-4">{idx + 1}</td>
                  <td className="py-2 px-4">
                    {editElm?._id === el._id ? (
                      <InputForm
                        defaultValue={editElm?.email}
                        fullWidth
                        register={register}
                        errors={errors}
                        id={"email"}
                        validate={{
                          required: "Trường này không được để trống",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Địa chỉ email không hợp lệ",
                          },
                        }}
                      />
                    ) : (
                      <span>{el.email}</span>
                    )}
                  </td>
                  <td className="py-2 px-4 flex items-center">
                    {editElm?._id === el._id ? (
                      <InputForm
                        defaultValue={editElm?.firstname}
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"firstname"}
                        validate={{ required: "Trường này không được để trống" }}
                      />
                    ) : (
                      <span>{el.firstname}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElm?._id === el._id ? (
                      <InputForm
                        defaultValue={editElm?.lastname}
                        fullWidth
                        register={register}
                        errors={errors}
                        id={"lastname"}
                        validate={{ required: "Trường này không được để trống" }}
                      />
                    ) : (
                      <span>{el.lastname}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElm?._id === el._id ? (
                      <Select
                      defaultValue={el.role}
                      fullWidth
                      register={register}
                      errors={errors}
                      id={"role"}
                      validate={{ required: "Trường này không được để trống" }} 
                      options={roles} />
                    ) : (
                      <span>
                        {roles.find((role) => +role.code === +el.role)?.value}
                      </span>
                    )}
                  </td>

                  <td className="py-2 px-4">
                    {editElm?._id === el._id ? (
                      <InputForm
                        defaultValue={editElm?.mobile}
                        fullWidth
                        register={register}
                        errors={errors}
                        id={"mobile"}
                        validate={{
                          required: "Trường này không được để trống",
                          pattern: {
                            value: /^[62|0]+\d{9}/gi,
                            message: "Số điện thoại không hợp lệ",
                          },
                        }}
                      />
                    ) : (
                      <span>{el.mobile}</span>
                    )}
                  </td>

                  <td className="py-2 px-4">
                    {editElm?._id === el._id ? (
                      <Select
                      defaultValue={el.isBlocked}
                      fullWidth
                      register={register}
                      errors={errors}
                      id={'isBlocked'}
                      validate={{ required: "Trường này không được để trống" }}
                      options={blockStatus}  />
                    ) : (
                      <span>{el.isBlocked ? "Blocked" : "Active"}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {moment(el.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="py-2 px-4">
                    {editElm?._id === el._id ? (
                      <span
                        onClick={() => setEditElm(null)}
                        className="px-2 text-orange-500 hover:underline cursor-pointer"
                      >
                        Hủy
                      </span>
                    ) : (
                      <span
                        onClick={() => setEditElm(el)}
                        className="px-2 text-orange-500 hover:underline cursor-pointer"
                      >
                        Sửa
                      </span>
                    )}
                    <span onClick={() => handleDeleteUser(el._id)} className="px-2 text-red-700 hover:underline cursor-pointer">
                      Xóa
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>

        <div className="w-full flex justify-end">
          <Pagination totalCount={users?.counts} />
        </div>
      </div>
    </div>
  );
};
export default ManageUser;

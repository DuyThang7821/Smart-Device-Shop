import React, { useEffect, useState } from "react";
import { apiGetUsers } from "apis/user";
import { roles } from "ultils/contants";
const ManageUser = () => {
  const [users, setUsers] = useState(null);
  const fetchUsers = async (params) => {
    const response = await apiGetUsers(params);
    if (response.success) setUsers(response);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="w-full">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
        <span>Manage users</span>
      </h1>
      <div className="w-full p-4">
        <table className="table-auto mb-6 text-left w-full">
          <thead className="font-bold bg-gray-700 text-[13px]  text-white">
            <tr className="border border-gray-500">
              <th className= 'px-4 py-2'>ID</th>
              <th className= 'px-4 py-2'>Email address</th>
              <th className= 'px-4 py-2'>Fullname</th>
              <th className= 'px-4 py-2'>Role</th>
              <th className= 'px-4 py-2'>Phone</th>
              <th className= 'px-4 py-2'>Status</th>
              <th className= 'px-4 py-2'>CreatedAt</th>
              <th className= 'px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.users?.map((el, idx) => (
              <tr key={el.id} className="border border-gray-500">
                <td className="py-2 px-4">{idx+1}</td>
                <td className="py-2 px-4">{el.email}</td>
                <td className="py-2 px-4">{`${el.lastname} ${el.firstname}`}</td>
                <td className="py-2 px-4">{roles.find(role => +role.code === +el.role)?.value}</td>
                <td className="py-2 px-4">{el.mobile}</td>
                <td className="py-2 px-4">{el.isBlocked ? 'Blocked': 'Active'}</td>
                <td className="py-2 px-4">{el.createdAt}</td>
                <td className="py-2 px-4">
                    <span className="px-2 text-orange-500 hover:underline cursor-pointer">Edit</span>
                    <span className="px-2 text-red-700 hover:underline cursor-pointer">Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageUser;

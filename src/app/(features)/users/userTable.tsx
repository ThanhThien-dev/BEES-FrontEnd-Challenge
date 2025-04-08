import React from "react";
import { User } from "../../types";
import { format } from "date-fns";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";

interface UserTableProps {
  currentUsers: User[];
  sortField: keyof User | null;
  sortDirection: "asc" | "desc";
  handleEditClick: (user: User) => void;
  handleDelete: (userId: number | string) => void;
  handleSort: (field: keyof User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  currentUsers,
  sortField,
  sortDirection,
  handleSort,
  handleEditClick,
  handleDelete,
}) => {
  const formatCurrency = (amount: number) =>
    `$${amount.toLocaleString("en-US")}`;
  const formatDate = (date: string | Date) =>
    format(typeof date === "string" ? new Date(date) : date, "yyyy-MM-dd");
  const formatDateTime = (date: string | Date) =>
    format(
      typeof date === "string" ? new Date(date) : date,
      "yyyy-MM-dd HH:mm:ss"
    );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="shadow border-2 dark:border-gray-200 rounded-lg w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
            {["id", "name", "balance", "email", "registerAt", "status"].map(
              (field) => (
                <th
                  key={field}
                  className="hover:bg-blue-200 px-4 py-2 text-left cursor-pointer"
                  onClick={() => handleSort(field as keyof User)}
                >
                  <div className="flex items-center">
                    {field.charAt(0).toUpperCase() +
                      field.slice(1).replace("registerAt", "Registration Date")}
                    {sortField === field && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              )
            )}
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-200 border-b"
            >
              <td className="px-4 py-2 dark:text-gray-200">{user.id}</td>
              <td className="px-4 py-2 dark:text-gray-200">{user.name}</td>
              <td className="px-4 py-2 dark:text-gray-200">
                {formatCurrency(user.balance)}
              </td>
              <td className="px-4 py-2">
                <a
                  href={`mailto:${user.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {user.email}
                </a>
              </td>
              <td className="px-4 py-2 dark:text-gray-200">
                <span title={formatDateTime(user.registerAt)}>
                  {formatDate(user.registerAt)}
                </span>
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    user.status
                  )}`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    title="Edit"
                  >
                    <RiEdit2Line />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    title="Delete"
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

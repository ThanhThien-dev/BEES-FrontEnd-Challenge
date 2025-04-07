"use client";

import { useState, useEffect } from "react";
import { User } from "../../types";
import { fetchUsers, updateUser, deleteUser } from "../../data/users";
import Header from "../../component/header/page";
import UserTable from "./userTable";
import Pagination from "./pagination";

import EditUserModal from "./modal";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const sortUsers = (usersToSort: User[]) => {
    if (!sortField) return usersToSort;
    return [...usersToSort].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (sortField === "id") {
        const aId =
          typeof aValue === "string" ? parseFloat(aValue) : (aValue as number);
        const bId =
          typeof bValue === "string" ? parseFloat(bValue) : (bValue as number);
        return sortDirection === "asc" ? aId - bId : bId - aId;
      }
      if (sortField === "balance") {
        return sortDirection === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (sortField === "registerAt") {
        const aDate = new Date(aValue as string | Date).getTime();
        const bDate = new Date(bValue as string | Date).getTime();
        return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
      }
      return 0;
    });
  };

  const filterUsers = (usersToFilter: User[]) => {
    let filtered = usersToFilter;
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (user) => user.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.id.toString().includes(term)
      );
    }
    return filtered;
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleEditSave = async (updatedData: Partial<User>) => {
    if (!selectedUser) return;
    const updatedUser = await updateUser(selectedUser.id, updatedData);
    setUsers(
      users.map((user) => (user.id === selectedUser.id ? updatedUser : user))
    );
  };

  const handleDelete = async (userId: string | number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId.toString());
        setUsers(users.filter((user) => user.id !== userId.toString()));
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const processedUsers = sortUsers(filterUsers(users));
  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = processedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(processedUsers.length / rowsPerPage);

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(
          "An error occurred while loading data. Please try again later."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <main className="bg-white dark:bg-gray-900 p-8 pt-0 min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-center items-center mb-8">
          <h1 className="font-bold dark:text-white text-3xl">
            Users Management Page
          </h1>
        </div>
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="border-b-2 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        )}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 mb-4 px-4 py-3 border border-red-400 dark:border-red-600 rounded text-red-700 dark:text-red-200">
            <p>{error}</p>
            <button
              className="bg-red-500 hover:bg-red-600 mt-2 px-4 py-2 rounded text-white"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        )}
        {!loading && !error && (
          <>
            <div className="flex md:flex-row flex-col justify-between items-center gap-4 mb-4">
              {/* Search  */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 border rounded w-full md:w-64 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 dark:text-white">
                {/* Filter */}
                <label htmlFor="statusFilter">Filter by status:</label>
                <select
                  id="statusFilter"
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="dark:bg-gray-500 px-2 py-1 border rounded"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>

                {/* Number of page */}
                <label htmlFor="rowsPerPage" className="ml-4">
                  Show:
                </label>
                <select
                  id="rowsPerPage"
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  className="dark:bg-gray-500 px-2 py-1 border rounded"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            {processedUsers.length > 0 ? (
              <div className="w-full">
                {/* Users Table */}
                <UserTable
                  currentUsers={currentUsers}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                  handleEditClick={handleEditClick}
                  handleDelete={handleDelete}
                />

                {/* Pagination */}
                <Pagination
                  indexOfFirstUser={indexOfFirstUser}
                  indexOfLastUser={indexOfLastUser}
                  processedUsersLength={processedUsers.length}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500 dark:text-gray-200">
                  No users match the current filters.
                </p>
              </div>
            )}
          </>
        )}
        <EditUserModal
          isOpen={isEditModalOpen}
          user={selectedUser}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          onSave={handleEditSave}
        />
      </div>
    </main>
  );
};

export default UsersPage;

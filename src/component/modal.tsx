import { useState, useEffect } from "react";
import { User } from "../types";

interface EditUserModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (updatedData: Partial<User>) => Promise<void>;
}

const EditUserModal = ({
  isOpen,
  user,
  onClose,
  onSave,
}: EditUserModalProps) => {
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        balance: user.balance,
        email: user.email,
        status: user.status,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Failed to save user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/30">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="mb-4 font-semibold text-xl">
          Edit User (ID: {user.id})
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 text-sm">
              Name
            </label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="block mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 text-sm">
              Balance
            </label>
            <input
              type="number"
              value={formData.balance || ""}
              onChange={(e) =>
                setFormData({ ...formData, balance: Number(e.target.value) })
              }
              className="block mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 text-sm">
              Email
            </label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="block mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 text-sm">
              Status
            </label>
            <select
              value={formData.status || ""}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="block mt-1 p-2 border rounded-md w-full"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;

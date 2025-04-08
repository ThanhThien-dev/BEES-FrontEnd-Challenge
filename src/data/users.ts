import axios from "axios";
import { User } from "../types";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined in .env");
}
const API_URL: string = process.env.NEXT_PUBLIC_API_URL;

// GET USERS
export const fetchUsers = async (): Promise<User[]> => {
  const statuses = ["Active", "Inactive", "Pending", "Suspended"];
  try {
    const response = await axios.get(API_URL);

    // Convert data from API to User[]
    const users: User[] = response.data.map((user: any) => ({
      id: user.id.toString(),
      name: user.name,
      balance: user.balance,
      email: user.email,
      registerAt: user.register_at,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }));

    return users;
  } catch (error) {
    console.error("Error while fetching data:", error);
    throw new Error("Unable to get user data.");
  }
};

// UPDATE USER
export const updateUser = async (
  userId: string,
  updatedData: Partial<User>
): Promise<User> => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, updatedData);

    // Convert returned data to User
    const updatedUser: User = {
      id: response.data.id.toString(),
      name: response.data.name,
      balance: response.data.balance,
      email: response.data.email,
      registerAt: response.data.register_at,
      status: response.data.status || updatedData.status,
    };

    return updatedUser;
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    throw new Error("Unable to update user information.");
  }
};

// DELETE USER
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${userId}`);
  } catch (error) {
    console.error(`Error when delete user ${userId}:`, error);
    throw new Error("Unable to delete user.");
  }
};

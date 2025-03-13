"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/users";

// 🛠️ Create User
export async function createUser(
  name: string,
  email: string,
  avatarUrl: string
) {
  try {
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const newUser = await User.create({ name, email, avatarUrl });
    return { success: true, user: newUser };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 🛠️ Get User by Email
export async function getUserByEmail(email: string) {
  try {
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

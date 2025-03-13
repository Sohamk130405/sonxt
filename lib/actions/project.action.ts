"use server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/lib/models/projects";
import User from "@/lib/models/users";

// 🛠️ Create Project
export async function createProject(input: any) {
  try {
    await connectDB();
    const user = await User.findById(input.createdBy);
    if (!user) throw new Error("User not found");

    const newProject = await Project.create(input);
    user.projects?.push(newProject._id);
    await user.save();

    return { success: true, project: newProject };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 🛠️ Update Project
export async function updateProject(id: string, input: any) {
  try {
    await connectDB();
    const updatedProject = await Project.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!updatedProject) throw new Error("Project not found");

    return { success: true, project: updatedProject };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 🛠️ Delete Project
export async function deleteProject(id: string) {
  try {
    await connectDB();
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) throw new Error("Project not found");

    return { success: true, deletedId: id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 🛠️ Get Projects (Pagination & Filtering)
export async function getProjects(category?: string, endcursor?: string) {
  try {
    await connectDB();
    const query: any = category ? { category } : {};
    const projects = await Project.find(query)
      .limit(8)
      .skip(Number(endcursor) || 0)
      .populate("createdBy");

    return { success: true, projects };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 🛠️ Get Project by ID
export async function getProjectById(id: string) {
  try {
    await connectDB();
    const project = await Project.findById(id).populate("createdBy");
    if (!project) throw new Error("Project not found");

    return { success: true, project };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 🛠️ Get Projects of a User
export async function getProjectsOfUser(userId: string, last: number = 4) {
  try {
    await connectDB();
    const user = await User.findById(userId).populate({
      path: "projects",
      options: { limit: last },
    });

    if (!user) throw new Error("User not found");

    return { success: true, projects: user.projects };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

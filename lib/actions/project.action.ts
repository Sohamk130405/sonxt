"use server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/lib/models/projects";
import User from "@/lib/models/users";
import { ProjectForm, ProjectInterface } from "@/common.types";
import { getCurrentUser } from "../session";

export const uploadImage = async (imagePath: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

// 🛠️ Create Project
export async function createProject(form: ProjectForm) {
  try {
    await connectDB();
    const session = await getCurrentUser();
    if (!session?.user) throw new Error("Unauthorized Access");
    const user = await User.findById(session.user._id);
    if (!user) throw new Error("User not found");

    const imageUrl = await uploadImage(form.image);
    if (!imageUrl.url) throw new Error("Image Url Not Found");

    const newProject = await Project.create({
      ...form,
      image: imageUrl.url,
      createdBy: session.user._id,
    });

    user.projects?.push(newProject._id);
    await user.save();
    return { success: true, message: "Project Created Successfully" };
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
export async function getProjects(category?: string, endCursor?: string) {
  try {
    await connectDB();
    const query: any = category ? { category } : {};

    const limit = 8;
    const cursor = Number(endCursor) || 0;
    const projects = await Project.find(query)
      .sort({ _id: 1 })
      .skip(cursor)
      .limit(limit)
      .populate("createdBy", "name email avatarUrl _id");

    const totalProjects = await Project.countDocuments(query);
    const hasNextPage = cursor + limit < totalProjects;
    const hasPreviousPage = cursor > 0;

    return {
      projects,
      pageInfo: {
        hasPreviousPage,
        hasNextPage,
        startCursor: projects.length > 0 ? projects[0]._id.toString() : "",
        endCursor:
          projects.length > 0
            ? projects[projects.length - 1]._id.toString()
            : "",
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 🛠️ Get Project by ID
export async function getProjectById(id: string) {
  try {
    await connectDB();
    const project = (await Project.findById(id).populate(
      "createdBy",
      "name email avatarUrl _id"
    )) as ProjectInterface;
    if (!project) throw new Error("Project not found");

    return { success: true, project };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 🛠️ Get Projects of a User
export async function getProjectsOfUser(userId: string, limit?: number) {
  try {
    await connectDB();

    const user = await User.findById(userId)
      .select("_id name email description avatarUrl githubUrl linkedinUrl")
      .populate({
        path: "projects",
        options: limit ? { limit, sort: { _id: -1 } } : { sort: { _id: -1 } },
        select: "title image _id",
        populate: {
          path: "createdBy",
          select: "name email avatarUrl _id",
        },
      });

    if (!user) throw new Error("User not found");

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

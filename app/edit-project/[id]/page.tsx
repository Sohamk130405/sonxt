import { ProjectInterface } from "@/common.types";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getProjectById } from "@/lib/actions/project.action";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  if (!session.user) redirect("/");

  const result = (await getProjectById(id)) as { project: ProjectInterface };
  const project = result.project;
  if (!project) {
    redirect("/");
  }
  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm
        type="edit"
        project={{
          _id: project._id.toString(),
          category: project.category,
          image: project.image,
          createdBy: {
            name: project.createdBy.name,
            _id: project.createdBy._id.toString(),
            avatarUrl: project.createdBy.avatarUrl,
            email: project.createdBy.email,
          },
          description: project.description,
          liveSiteUrl: project.liveSiteUrl,
          githubUrl: project.githubUrl,
          title: project.title,
        }}
      />
    </Modal>
  );
};

export default EditProject;

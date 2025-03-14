"use client";
import { deleteProject } from "@/lib/actions/project.action";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProjectActions = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteProject = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteProject(projectId);
      if (res.success) {
        router.push("/");
      } else {
        alert(res.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src={"/pencile.svg"} width={15} height={15} alt="edit" />
      </Link>
      <button
        disabled={isDeleting}
        type="button"
        onClick={handleDeleteProject}
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
      >
        <Image src={"/trash.svg"} width={15} height={15} alt="delete" />
      </button>
    </>
  );
};

export default ProjectActions;

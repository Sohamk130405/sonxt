import { ProjectInterface, UserProfile } from "@/common.types";
import { getProjectsOfUser } from "@/lib/actions/project.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  userId: string;
  projectId: string;
};

const RelatedProjects = async ({ projectId, userId }: Props) => {
  const data = (await getProjectsOfUser(userId, 5)) as {
    success: boolean;
    user: UserProfile;
  };
  const filteredProjects = data.user.projects.filter(
    (project) => project._id !== projectId
  );

  if (filteredProjects.length === 0) return null;

  return (
    <section className="flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {data.user.name}</p>
        <Link
          href={`/profile/${userId}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>
      <div className="related_projects-grid">
        {filteredProjects.map((project) => (
          <div
            key={project._id}
            className="flexCenter related_project-card drop-shadow-card"
          >
            <Link
              href={`/project/${project._id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={project.image}
                width={414}
                height={314}
                className="object-cover w-full h-full rounded-2xl"
                alt="project image"
              />
              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{project.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;

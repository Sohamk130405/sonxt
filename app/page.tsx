import { ProjectSearch } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/actions/project.action";
import React from "react";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({
  searchParams: { category, endcursor },
}: {
  searchParams: { category?: string; endcursor?: string };
}) => {
  const data = (await getProjects(category, endcursor)) as ProjectSearch;
  const projects = data.projects;

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />
      {projects.length === 0 ? (
        <p className="no-result-text text-center">
          No projects found, go create some first.
        </p>
      ) : (
        <>
          <section className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                id={project._id}
                image={project.image}
                title={project.title}
                name={project.createdBy.name}
                avatarUrl={project.createdBy.avatarUrl}
                userId={project.createdBy._id}
              />
            ))}
          </section>
          <LoadMore
            startCursor={data.pageInfo.startCursor}
            endCursor={data.pageInfo.endCursor}
            hasPreviousPage={data.pageInfo.hasPreviousPage}
            hasNextPage={data.pageInfo.hasNextPage}
          />
        </>
      )}
    </section>
  );
};

export default Home;

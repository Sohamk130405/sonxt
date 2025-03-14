import { ProjectSearch } from "@/common.types";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/actions/project.action";
import React from "react";

const Home = async () => {
  const data = (await getProjects()) as ProjectSearch;
  const projects = data.projects;

  if (projects.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        Categories
        <p className="no-result-text text-center">
          No projects found, go create some first.
        </p>
      </section>
    );
  }
  return (
    <section className="flexStart flex-col paddings mb-16">
      <h1>Categories</h1>
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
      <h1>LoadMore</h1>
    </section>
  );
};

export default Home;


import { useEffect, useState } from "react";
import { sanityClient } from "../sanity/client";
import Project from "./project";
import ProjectsList from "./projects-list";
import type { SanityTech, SanityProject, Tech, ProjectType } from "../types/project-types";

const Projects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectType | null>(null);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"] {
          id,
          projectName,
          projectDescription,
          "techStack": techStack[]->{
            techName, 
            image {
              asset-> {
                _id,
                url
              },
              alt
            }
          },
          githubLink,
        }`
      )
      .then((data: SanityProject[]) => {
        const mapped: ProjectType[] = data.map((project: SanityProject) => {
          const techs: SanityTech[] = project.techStack;
          const tmp: Tech[] = techs.map((tech: SanityTech) => ({
            name: tech.techName,
            imageUrl: tech.image.asset.url,
          }));
          return {
            id: project.id,
            name: project.projectName,
            description: project.projectDescription,
            techStack: tmp,
            githubLink: project.githubLink,
          };
        });
        setProjects(mapped);
        setCurrentProject(mapped[0] || null);
      })
      .catch(console.error);
  }, []);

  const changeHandler = (id: string | number) => {
    return () => {
      if (!currentProject || id === currentProject.id) return;
      const contentBox = document.getElementById("procon");
      if (!contentBox) return;
      contentBox.classList.toggle("show-front");
      contentBox.classList.toggle("show-back");
      setTimeout(() => {
        const idx = typeof id === "string" ? parseInt(id) : id;
        setCurrentProject(projects[idx - 1] || null);
        contentBox.classList.toggle("show-front");
        contentBox.classList.toggle("show-back");
      }, 250);
    };
  };

  if (!projects || !currentProject) {
    return <div>Loading</div>;
  }

  return (
    <div
      id="projects"
      className="site-container h-fit flex flex-col justify-center py-3"
    >
      <h1 className="tracking-wider text-gradient text-6xl my-2 py-2 font-mono font-medium">
        Projects
      </h1>
      <div className="container text-white md:h-5/6 gap-10 flex flex-col-reverse items-start md:items-stretch md:flex  md:flex-row md:justify-between">
        <Project project={currentProject}></Project>
        <ProjectsList
          projects={projects}
          onSwitch={changeHandler}
        ></ProjectsList>
      </div>
    </div>
  );
};

export default Projects;
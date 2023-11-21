import { sanityClient } from "../Client";
import { useEffect, useState } from "react";
import Project from "../Components/Project";
import ProjectsList from "../Components/ProjectsList";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState("");
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
      .then((data) => {
        const mapped = data.map((project) => {
          const techs = project.techStack;
          const tmp = techs.map((tech) => {
            return {
              name: tech.techName,
              imageUrl: tech.image.asset.url,
            };
          });
          return {
            id: project.id,
            name: project.projectName,
            description: project.projectDescription,
            techStack: tmp,
            githubLink: project.githubLink,
          };
        });
        setProjects(mapped);
        setCurrentProject(mapped[0]);
      })
      .catch(console.error);
  }, []);

  const changeHandler = (id) => {
    if (id === currentProject.id) return;
    return () => {
      const contentBox = document.getElementById("procon");
      contentBox.classList.toggle("show-front");
      contentBox.classList.toggle("show-back");
      setTimeout(() => {
        id = parseInt(id);
        setCurrentProject(projects[id - 1]);

        contentBox.classList.toggle("show-front");
        contentBox.classList.toggle("show-back");
      }, 250);
    };
  };

  if (!projects) {
    return <div>Loading</div>;
  }

  return (
    <div
      id="projects"
      className="h-fit w-5/6 mx-auto flex flex-col justify-center py-3"
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

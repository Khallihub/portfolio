import { useState } from "react";
import Project from "../Components/Project";
import ProjectsList from "../Components/ProjectsList";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Project 1",
      description:
        "This is a NPM package that takes an SVG file and renders it as a inline SVG to the DOM and can also render HTML files too. You can also pass data to it that renders where its specified inside double curly braces. I created this to solve problems with some frameworks and bundlers when using inline SVG files and to keep code cleaner and easier to read. ",
      techStack: ["React", "Tailwind", "Node"],
      github: "github.com",
    },
    {
      id: 2,
      name: "Project 2",
      description:
        "Real-time Analytics: Big data platforms often provide real-time data processing capabilities. ML models can be integrated into these systems to make real-time predictions, enabling businesses to react swiftly to changing scenarios.",
      techStack: ["React", "Tailwind", "Node"],
      github: "github.com",
    },
    {
      id: 3,
      name: "Project 3",
      description:
        "This is a NPM package that takes an SVG file and renders it as a inline SVG to the DOM and can also render HTML files too. You can also pass data to it that renders where its specified inside double curly braces. I created this to solve problems with some frameworks and bundlers when using inline SVG files and to keep code cleaner and easier to read. ",
      techStack: ["React", "Tailwind", "Node"],
      github: "github.com",
    },
    {
      id: 4,
      name: "Project 4",
      description:
        "This is a NPM package that takes an SVG file and renders it as a inline SVG to the DOM and can also render HTML files too. You can also pass data to it that renders where its specified inside double curly braces. I created this to solve problems with some frameworks and bundlers when using inline SVG files and to keep code cleaner and easier to read. ",
      techStack: ["React", "Tailwind", "Node"],
      github: "github.com",
    },
    {
      id: 5,
      name: "Project 5",
      description:
        "This is a NPM package that takes an SVG file and renders it as a inline SVG to the DOM and can also render HTML files too. You can also pass data to it that renders where its specified inside double curly braces. I created this to solve problems with some frameworks and bundlers when using inline SVG files and to keep code cleaner and easier to read. ",
      techStack: ["React", "Tailwind", "Node"],
      github: "github.com",
    },
    {
      id: 6,
      name: "Project 6",
      description:
        "This is a NPM package that takes an SVG file and renders it as a inline SVG to the DOM and can also render HTML files too. You can also pass data to it that renders where its specified inside double curly braces. I created this to solve problems with some frameworks and bundlers when using inline SVG files and to keep code cleaner and easier to read. ",
      techStack: ["React", "Tailwind", "Node"],
      github: "github.com",
    },
  ];
  const [currentProject, setCurrentProject] = useState(projects[0]);

  const changeHandler = (id) => {
    return () => {
      id = parseInt(id);
      setCurrentProject(projects[id - 1]);

    };
  };
  return (
    <div
      id="projects"
      className="sm:h-screen w-5/6 mx-auto flex flex-col justify-center relative"
    >
      <h1 className="tracking-wider text-gradient text-6xl my-2 py-2 font-mono font-medium">
        Projects
      </h1>
      <div className="container text-white md:h-5/6 flex flex-col-reverse items-start md:items-stretch md:flex  md:flex-row md:justify-between">
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

const ProjectsList = (props) => {
  const projects = props.projects;
  const changeHandler = props.onSwitch;
  return (
    <div className="flex flex-col self-start justify-center items-center gap-6 md:w-1/3 relative top-0 left-0">
      <h1 className="p-4 text-5xl">Projects</h1>
      <div className="flex">
        <div className="h-full flex flex-col justify-start">
          <div className="list-border-left"></div>
        </div>
        <div className="list-border-top"></div>
        <div className="flex flex-col justify-center items-start gap-4 p-6 mx-4">
          {projects.map((project) => (
            <button key={project.id} onClick={changeHandler(project.id)}>
              <h1 className="hover:tracking-widest border-b-2 tracking-tight">
                {project.name}
              </h1>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;

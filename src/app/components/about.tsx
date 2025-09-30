
const About = () => {
	return (
		<div id="about" className="w-screen">
			<div className="site-container py-4 md:py-10">
				<div className="flex flex-col-reverse md:flex-row items-stretch gap-8 md:gap-12">
					<div className="w-full h-full self-center text-white md:w-3/4">
						<h1 className="tracking-wider text-gradient text-5xl md:text-6xl mt-2 font-medium w-fit">
							ABOUT
						</h1>
						<p className="text-lg md:text-xl mt-6 pt-6 border-t-2 max-w-prose leading-relaxed">
							I am a full-stack software engineer with a strong foundation in building <strong>scalable and user-friendly applications</strong>. I graduated from <strong>Addis Ababa University with a degree in Software Engineering </strong> and have experience across both <strong>frontend and backend development</strong> as well as modern tools for deployment, testing, and automation.
							<br /><br />
							I am passionate about writing clean, efficient code and collaborating with teams to deliver high-quality solutions. I am currently seeking opportunities to contribute my skills and grow as a developer while creating meaningful software.
						</p>
					</div>
					<div className="w-full md:w-1/4 flex items-start justify-start md:justify-end">
						<div className="project-side-border hidden md:block" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
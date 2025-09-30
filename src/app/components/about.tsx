
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
							I am a full‑stack developer focused on crafting user‑centric, performant web experiences. I enjoy turning complex problems into intuitive interfaces and building reliable services behind the scenes. Recently, I completed UT Austin’s coding bootcamp (MERN) and I’m looking to contribute to a collaborative team.
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
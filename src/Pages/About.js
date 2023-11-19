const About = () => {
  return (
    <div id="about" className="w-screen">
      <div className="flex flex-col-reverse md:flex-row p-6 md:p-0 mx-auto items-stretch  xl:container">
        <div className="w-full h-full self-center text-white m-4 xl:w-3/4 p-6">
          <h1 className="tracking-wider text-gradient border-purple text-6xl mt-2 font-medium text-gradient w-fit">
            ABOUT
          </h1>
          <p className="text-xl mt-5 border-t-2 pt-4">
            I am a full-stack web developer with a passion for creating
            beautiful and functional websites. I am a recent graduate of the
            University of Texas at Austin's Coding Bootcamp, where I learned the
            MERN stack. I am currently looking for opportunities to work with a
            team of developers to create amazing websites.
          </p>
        </div>
          <img
            src="https://images.unsplash.com/photo-1570158268183-d296b2892211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBvcnRyYWl0fGVufDB8fDB8fHww"
            alt="Khalid Abdu Kemal"
            className="img rounded-3xl md:rounded-none md:rounded-bl-3xl "
          />
      </div>
    </div>
  );
};

export default About;

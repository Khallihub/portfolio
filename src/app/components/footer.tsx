const Footer = () => {
  return (
    <div className="h-screen flex justify-center items-center footerBg ">
      <div className="h-1/3 site-container flex flex-col justify-around rotate-180  items-center">
        <h1 className="text-3xl text-white text-center mb-4 md:mb-8">
          Feel free to connect on social media.
        </h1>
        <div className="flex flex-wrap justify-center w-full md:w-1/2 text-white mb-4 md:mb-8">
          <a
            href="mailto: khalid11abdu@gmail.com"
            className="link mr-4 mb-4 md:mb-0 hover:text-black"
            rel="noreferrer"
            target="_blank"
            aria-label="mail"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-mail"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/khalid-abdu-kemal-2b9792218/"
            className="link mr-4 mb-4 md:mb-0 hover:text-black"
            rel="noreferrer"
            target="_blank"
            aria-label="linkedin"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-linkedin"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://github.com/Khallihub"
            className="link mr-4 mb-4 md:mb-0 hover:text-black"
            rel="noreferrer"
            target="_blank"
            aria-label="github"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-github"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a
            href="https://twitter.com/KHAILD000000000"
            className="link mb-4 md:mb-0 hover:text-black"
            rel="noreferrer"
            target="_blank"
            aria-label="twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-twitter"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
        </div>
        <div>
          <a href="#contact" className="border-4 border-white text-white px-8 py-2 rounded-xl mb-4 md:mb-8 hover:border-black">Let&apos;s Talk</a>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-white text-center">
            &copy; 2023 Khalid Abdu
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
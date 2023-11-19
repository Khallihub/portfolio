import React from "react";

const Contact = () => {
  function changeClass(label) {
    let label1;
    let label2;
    if (label === "message") {
      label1 = "name";
      label2 = "email";
    } else if (label === "name") {
      label1 = "message";
      label2 = "email";
    } else {
      label1 = "name";
      label2 = "message";
    }
    return () => {
      document
        .getElementById(`${label}Label`)
        .classList.add("placeholder-label-focus");
      document
        .getElementById(`${label}Label`)
        .classList.remove("placeholder-label");
      if (document.getElementById(label1).value === "") {
        document
          .getElementById(`${label1}Label`)
          .classList.remove("placeholder-label-focus");
        document
          .getElementById(`${label1}Label`)
          .classList.add("placeholder-label");
      }
      if (document.getElementById(label2).value === "") {
        document
          .getElementById(`${label2}Label`)
          .classList.remove("placeholder-label-focus");
        document
          .getElementById(`${label2}Label`)
          .classList.add("placeholder-label");
      }
    };
  }
  return (
    <div className="flex justify-center items-center">
      <div
        id="contact"
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 min-h-screen flex flex-col p-6 "
      >
        <div className="pl-6 flex flex-col gap-4 sm:h-48">
          <div className="self-start">
            <h1 className="tracking-wider text-gradient text-6xl mt-2 font-medium ">
              Contact
            </h1>
          </div>
          <h2 className="text-white text-3xl pl-2">Get In Touch.</h2>
        </div>
        <form className="flex flex-col justify-between sm:h-3/4 items-center w-full py-6 text-white">
          <div className="w-full p-6 sm:p-6">
            <label htmlFor="name" id="nameLabel" className="placeholder-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="block w-full h-12 sm:h-14 px-4 text-xl sm:text-2xl font-mono outline-none border-2 hover:border-white border-purple bg-transparent rounded-[0.6rem] transition-all duration-200 focus:bg-gray-dark-5 active:bg-gray-dark-5"
              onFocus={changeClass("name")}
            />
          </div>
          <div className="w-full p-6 sm:p-6">
            <label
              htmlFor="email"
              id="emailLabel"
              className="placeholder-label"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="block w-full h-12 sm:h-14 px-4 text-xl sm:text-2xl font-mono outline-none border-2 hover:border-white border-purple bg-transparent rounded-[0.6rem] transition-all duration-200 focus:bg-gray-dark-5 active:bg-gray-dark-5"
              onFocus={changeClass("email")}
            />
          </div>
          <div className="w-full p-6 sm:p-6">
            <label
              htmlFor="message"
              id="messageLabel"
              className="placeholder-label"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              className="block w-full h-auto min-h-[10rem] max-h-[20rem] sm:h-14 py-2 px-4 text-xl sm:text-2xl hover:border-white font-mono outline-none border-2 border-purple bg-transparent rounded-[0.6rem] transition-all duration-200 focus:bg-gray-dark-5 active:bg-gray-dark-5"
              onFocus={changeClass("message")}
            ></textarea>
          </div>
          <div className="p-4">
            <button type="submit">
              <span className="text-xl sm:text-2xl font-mono text-white bg-purple border-2 border-purple hover:border-white shadow-lg rounded-[0.6rem] px-10 py-2 mt-10 transition-all duration-200 hover:bg-transparent hover:text-purple">
                Send
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

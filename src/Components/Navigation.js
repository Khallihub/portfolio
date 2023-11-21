import React, { Fragment } from "react";
import ReactDOM from "react-dom";

const Navigation = ({ isChecked, setIsChecked }) => {
  const closeModal = () => {
    const checkbox = document.querySelector(".hamburger-menu input");
    checkbox.checked = false;
    setIsChecked(false);
  };
  return (
    <div
      id="m-bar"
      className="w-screen h-screen flex flex-col justify-center sm:justify-end sm:pb-28 text-white"
    >
      <nav className="sm:h-3/5 h-1/4">
        <ul className="flex flex-col h-96 sm:w-3/4 w-5/6 ml-auto justify-around sm:p-0 pb-56  ">
          <li>
            <a href="#home">
              <div className="flex gap-2 items-end sm:p-1">
                <span>01</span>
                <h1
                  onClick={closeModal}
                  className="sm:text-7xl text-5xl hover:tracking-widest tracking-tight transition-all text-gradient hover:border-b-4 font-medium "
                >
                  HOME
                </h1>
              </div>
            </a>
          </li>
          <li>
            <a href="#about">
              <div className="flex gap-2 items-end sm:p-1">
                <span>02</span>
                <h1
                  onClick={closeModal}
                  className="sm:text-7xl text-5xl hover:tracking-widest tracking-tight transition-all text-gradient hover:border-b-4 font-medium"
                >
                  ABOUT
                </h1>
              </div>
            </a>
          </li>
          <li>
            <a href="#skills">
              <div className="flex gap-2 items-end sm:p-1">
                <span>03</span>
                <h1
                  onClick={closeModal}
                  className="sm:text-7xl text-5xl hover:tracking-widest tracking-tight transition-all text-gradient hover:border-b-4 font-medium"
                >
                  SKILLS
                </h1>
              </div>
            </a>
          </li>
          <li>
            <a href="#projects">
              <div className="flex gap-2 items-end sm:p-1">
                <span>04</span>
                <h1
                  onClick={closeModal}
                  className="sm:text-7xl text-5xl hover:tracking-widest tracking-tight transition-all text-gradient hover:border-b-4 font-medium"
                >
                  PROJECTS
                </h1>
              </div>
            </a>
          </li>
          <li>
            <a href="#contact">
              <div className="flex gap-2 items-end sm:p-1">
                <span>05</span>
                <h1
                  onClick={closeModal}
                  className="sm:text-7xl text-5xl hover:tracking-widest tracking-tight transition-all text-gradient hover:border-b-4 font-medium"
                >
                  CONTACT
                </h1>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const NavigationModal = ({ isChecked, setIsChecked }) => {
  const portalElement = document.getElementById("nav-modal");
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Navigation isChecked={isChecked} setIsChecked={setIsChecked} />,
        portalElement
      )}
    </Fragment>
  );
};

export default NavigationModal;

"use client";

import React from "react";

type NavigationProps = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navigation = ({ setIsChecked }: Omit<NavigationProps, 'isChecked'>) => {
  const closeModal = () => {
    const checkbox = document.querySelector(".hamburger-menu input") as HTMLInputElement | null;
    if (checkbox) {
      checkbox.checked = false;
    }
    setIsChecked(false);
  };
  return (
    <div
      id="m-bar"
      className="w-screen h-screen flex flex-col justify-center text-white"
    >
      <nav className="site-container">
        <ul className="flex flex-col gap-10 sm:gap-14">
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

const NavigationModal = ({ isChecked, setIsChecked }: NavigationProps) => {
  if (!isChecked) return null;
  return (
    <div className="fixed inset-0 z-40 bg-[rgb(18,14,22)]/95">
      <Navigation setIsChecked={setIsChecked} />
    </div>
  );
};

export default NavigationModal;
"use client";

import About from "./components/about";
import Contact from "./components/contact";
import Footer from "./components/footer";
import MenuModal from "./components/menu-bar";
import NavigationModal from "./components/navigation";
import Projects from "./components/projects";
import Skills from "./components/skills";
import Welcome from "./components/welcome";
import { useState, Fragment } from "react";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = () => {
    const checkbox = document.querySelector(".hamburger-menu input") as HTMLInputElement | null;
    setIsChecked(!!checkbox?.checked);
  };

  return (
    <Fragment>
      <div id="background" className="app-bg w-screen">
        <MenuModal checkHandler={checkHandler} />
        {isChecked && (
          <NavigationModal isChecked={isChecked} setIsChecked={setIsChecked} />
        )}
        {!isChecked && (
          <div className="space-y-24 lg:space-y-32">
            <Welcome />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </div>
        )}
      </div>
    </Fragment>
  );
}

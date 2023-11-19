import "./App.css";
import { Fragment, useState } from "react";
import Welcome from "./Pages/Welcome";
import About from "./Pages/About";
import Skills from "./Pages/Skills";
import Projects from "./Pages/Projects";
import NavigationModal from "./Components/Navigation";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer";
import MenuModal from "./Components/MenuBar";

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const checkHandler = () => {
    const checkbox = document.querySelector(".hamburger-menu input");
    setIsChecked(checkbox.checked);
  };
  return (
    <Fragment>
      <div id="background" className="app-bg w-screen">
        <MenuModal checkHandler={checkHandler} />
        {isChecked && <NavigationModal isChecked={isChecked} setIsChecked={setIsChecked} />}
        {!isChecked && (
          <>
            <Welcome />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </>
        )}
      </div>
    </Fragment>
  );
}

export default App;

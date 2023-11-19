import React, { Fragment } from "react";
import ReactDOM from "react-dom";

const MenuBar = ({checkHandler}) => {
  return (
    <div className="flex justify-between items-center w-4/5 mx-auto text-white h-40 absolute left-0 right-0 z-10">
      <div>
        <h1>logo</h1>
      </div>
      <div onClick={checkHandler}>
        <label className="hamburger-menu">
          <input type="checkbox" />
        </label>
      </div>
    </div>
  );
};

const MenuModal = ({checkHandler}) => {
  const portalElement = document.getElementById("menu-modal");
  return <Fragment>
    {ReactDOM.createPortal(<MenuBar checkHandler={checkHandler} />, portalElement)}
  </Fragment>
}

export default MenuModal;

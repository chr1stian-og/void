import userPic from "../assets/images/user.svg";
// import Greet from "./Greet";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/void.png";
import React from "react";

function Navbar({ userLogged }) {
  // let navigate = useNavigate();

  return (
    <>
      <nav className="fixed flex items-center mx-10 justify-between top-5 left-0 right-0">
        <div className="hidden sm:flex transition-all duration-300">
          <h1 className="text-red font-bold">
            VOID <span className="text-[#FF0054]">SOCIAL</span>
            <span className="mx-[2px]"></span>.
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <img src={logo} alt="logo" width={25} height={25} />
          {/* <Greet username={userLogged} /> */}
        </div>
        <div className="flex flex-row gap-2">
          <h3
            className="hover:cursor-pointer duration-150 transition-all hover:text-[#FF0054]"
            // onClick={() => navigate("/login", { replace: true })}
          >
            {userLogged || "LOGIN"}
          </h3>
          <span>
            <img src={userPic} alt="user" width={25} />
          </span>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

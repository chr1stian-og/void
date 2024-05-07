import { useNavigate } from "react-router-dom";
import userPic from "../assets/images/user.svg";

const logo = require("../assets/images/void.png");
function Navbar({ userLogged }) {
  let navigate = useNavigate();

  return (
    <>
      <div className="fixed flex items-center mx-10 justify-between top-5 left-0 right-0  ">
        <div className="hidden sm:flex transition-all duration-300">
          <h1 className="text-red font-bold">
            VOID <span className="text-[#FF0054]">SOCIAL</span>
            <span className="mx-[2px]"></span>.
          </h1>
        </div>
        <span>
          <img src={logo} alt="logo" width={25} height={25} />
        </span>
        <div className="flex flex-row gap-2">
          <h3
            className="hover:cursor-pointer duration-150 transition-all hover:text-[#FF0054]"
            onClick={() => navigate("/login", { replace: true })}
          >
            {userLogged || "LOGIN"}
          </h3>
          <span>
            <img src={userPic} width={25} />
          </span>
        </div>
      </div>
    </>
  );
}

export default Navbar;

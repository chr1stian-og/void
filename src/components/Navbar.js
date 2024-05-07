import { useNavigate } from "react-router-dom";
const logo = require("../assets/images/void.png");

function Navbar({ userLogged }) {
  let navigate = useNavigate();

  return (
    <>
      <div className="fixed items-center mx-10 justify-between top-5 left-0 right-0 flex ">
        <h1 className="text-red font-bold">
          VOID <span className="text-[#FF0054]">SOCIAL</span>
          <span className="mx-[2px]"></span>.
        </h1>
        <span>
          <img src={logo} alt="logo" width={25} height={25} />
        </span>
        <h3
          className="hover:cursor-pointer duration-150 transition-all hover:text-[#FF0054]"
          onClick={() => navigate("/login", { replace: true })}
        >
          {userLogged || "LOGIN"}
        </h3>
      </div>
    </>
  );
}

export default Navbar;

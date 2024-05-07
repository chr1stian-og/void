import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();

  return (
    <>
      <div className="fixed items-center mx-10 justify-between top-5 left-0 right-0 flex ">
        <h1 className="text-red font-bold">
          VOID <span className="text-[#FF0054]">SOCIAL</span>
          <span className="mx-[2px]"></span>.
        </h1>
        <h3 onClick={() => navigate("/login", { replace: true })}>LOGIN</h3>
      </div>
    </>
  );
}

export default Navbar;

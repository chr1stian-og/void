import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import validator from "validator";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3001" });

function Login({ updateUserId }) {
  const inputRef = useRef(null);
  let navigate = useNavigate();

  const [user, setUser] = useState({ id: 0, username: "", password: "" });
  const [showDialog, setShowDialog] = useState({
    status: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const login = async () => {
    if (user.username.length === 0) {
      return alert("Type in a username");
    }
    if (user.password.length === 0) {
      return alert("Type in a password");
    }
    await api
      .post("/api/login", user)
      .then((res) => {
        updateUserId(res.data);
        navigate("/home", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      login();
    }
  }

  return (
    <>
      <div
        className={`${!showDialog.status ? "hidden" : "fixed"} alert ${
          showDialog.type === "success" ? "alert-success" : "alert-error"
        } shadow-lg  rounded-full z-50 ${
          showDialog.message === "" ? "w-4 h-4" : "w-fit"
        } bottom-8 left-12`}
      >
        <div>
          <span className="font-bold">{showDialog.message}</span>
        </div>
      </div>
      <div className="h-screen overflow-y-hidden">
        <span className="flex mt-40 my-10 text-[#ffffff] min-w-max font-bold text-3xl justify-center items-center align-center">
          <h1 className="text-red font-bold">
            VOID <span className="text-[#FF0054]">SOCIAL</span>
            <span className="mx-[2px]"></span>.
          </h1>
        </span>

        <div className="flex flex-col gap-2 items-center">
          <input
            onKeyDown={handleKeyDown}
            ref={inputRef}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            max={30}
            placeholder="username"
            className="rounded-lg border-[#ffffff] px-6 py-2 w-[200px] sm:w-[350px] text-lg"
            min={5}
          />
          <input
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            min={5}
            max={30}
            autoComplete="true"
            type="password"
            placeholder="Password"
            className="rounded-lg border-[#ffffff] px-6 py-2 w-[200px] sm:w-[350px] text-lg"
          />
        </div>
        <div className="flex flex-col justify-center align-center items-center gap-2 m-2">
          <button
            onClick={login}
            className="bg-[#FF0054]  px-4 py-2 w-[200px] sm:w-[350px] text-black font-bold  rounded-xl"
          >
            LOGIN
          </button>

          <Link to="/signin">
            <button
              type="submit"
              className="border-[#FF0054] text-[#ffffff] border-2 font-bold  px-4 py-2 w-[200px] sm:w-[350px] rounded-xl"
            >
              SIGNUP{" "}
            </button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-4 flex justify-center items-center w-full">
        <div className="flex flex-col">
          <h2 className="text-[#ffffff40]">Username: void</h2>
          <h2 className="text-[#ffffff40]">Password: void@void.com</h2>
        </div>
      </div>
    </>
  );
}

export default Login;

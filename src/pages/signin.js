import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import validator from "validator";

// const api = axios.create({ baseURL: "http://localhost:3001" });
const api = axios.create({ baseURL: "http://localhost:3001" });

function Signin({ updateUserId }) {
  const inputRef = useRef(null);
  let dialogTimeout;
  let navigate = useNavigate();

  const [user, setUser] = useState({
    id: 0,
    username: "",
    email: "",
    password: "",
  });
  const [passwordToMatch, setPasswordToMatch] = useState("");
  const [showDialog, setShowDialog] = useState({
    status: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    inputRef.current.focus();
    // checkLogin();
  }, []);

  // const checkLogin = () => {
  //   api
  //     .get("/api/testToken")
  //     .then((res) => {
  //       if (
  //         res.data.token === "Token is invalid, Please Log in." ||
  //         res.data.token === null ||
  //         res.data.token === undefined
  //       )
  //         return;
  //       alert("");
  //       return navigate("/home", { replace: true });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const signup = () => {
    if (!validator.isEmail(user.email))
      return alert("The email format is incorrect");

    if (user.password === passwordToMatch) {
      api
        .post("/api/signin", {
          username: user.username,
          email: user.email,
          password: user.password,
        })
        .then((res) => {
          updateUserId(res.data.id);
          // checkLogin();
        })
        .catch((err) => {
          alert("Check email or password");
        });
    } else {
      alert("Passwords do not match");
    }
  };

  //hangle the Enter key response
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      signup();
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
          </h1>{" "}
        </span>
        <div onSubmit={signup} className="flex flex-col gap-2 items-center">
          <input
            onKeyDown={handleKeyDown}
            ref={inputRef}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            max={30}
            placeholder="Email"
            className="rounded-lg border-[#FF0054] px-6 py-2 w-[200px] sm:w-[350px] text-lg"
            min={5}
          />
          <input
            onKeyDown={handleKeyDown}
            ref={inputRef}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            max={30}
            placeholder="Username"
            className="rounded-lg border-[#FF0054] px-6 py-2 w-[200px] sm:w-[350px] text-lg"
            min={5}
          />
          <input
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            min={6}
            max={30}
            type="password"
            placeholder="Password"
            className="rounded-lg  border-[#FF0054] px-6 py-2 w-[200px] sm:w-[350px] text-lg"
          />
          <input
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setPasswordToMatch(e.target.value);
            }}
            min={6}
            max={30}
            type="password"
            placeholder="Confirm Password"
            className="rounded-lg border-[#FF0054] px-6 py-2 w-[200px] sm:w-[350px] text-lg"
          />
        </div>
        <div className="flex flex-col justify-center align-center items-center gap-2">
          <button
            onClick={signup}
            className="bg-[#FF0054] mt-4 px-4 py-3 font-bold w-[200px] sm:w-[350px] text-black rounded-xl"
          >
            SIGNUP
          </button>
          <Link to="/login">
            <button
              type="submit"
              className="border-2 border-[#FF0054] font-bold text-[#ffffff] text-md mt-[5px] px-4 py-2 w-[200px] sm:w-[350px] rounded-xl"
            >
              LOGIN{" "}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Signin;

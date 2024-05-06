import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Signin from "../pages/signin";
import Home from "../pages/home";
import { useState } from "react";

function RoutesComponent() {
  //   const [user, setUser] = useState({ id: 0, email: "", password: "" });

  //   const updateUserId = (newId) => {
  //     setUser((prevUser) => ({ ...prevUser, id: newId }));
  //   };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* <Route
          path="/login"
          element={<Login user={user} updateUserId={updateUserId} />}
        />
        <Route
          path="/signin"
          element={<Signin user={user} updateUserId={updateUserId} />}
        /> */}
      </Routes>
    </>
  );
}

export default RoutesComponent;
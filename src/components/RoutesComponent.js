import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Signin from "../pages/signin";
import Home from "../pages/home";
import { useState } from "react";

function RoutesComponent() {
  const [user, setUser] = useState({});

  const updateUserId = (newId) => {
    setUser(newId); // Update the user object with the new ID
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login user={user} />} />
        <Route
          path="/login"
          element={<Login user={user} updateUserId={updateUserId} />}
        />
        <Route path="/home" element={<Home userLogged={user} />} />
        <Route path="/signin" element={<Signin user={user} />} />
      </Routes>
    </>
  );
}

export default RoutesComponent;

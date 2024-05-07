import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Signin from "../pages/signin";
import Home from "../pages/home";

function RoutesComponent() {
  const [user, setUser] = useState(null);

  const updateUserId = (newId) => {
    setUser(newId);
  };

  return (
    <Routes>
      <Route path="/" element={<Login updateUserId={updateUserId} />} />
      <Route path="/login" element={<Login updateUserId={updateUserId} />} />
      <Route path="/home" element={<Home userLogged={user} />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default RoutesComponent;

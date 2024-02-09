import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const AuthProvider = ({ auth }) => {
  if (auth) {
    console.log("if outlet running...");
    return <Outlet />;
  } else {
    console.log("auth", auth);
    return <Navigate to={"/"} />;
  }
};

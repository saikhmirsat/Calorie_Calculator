import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRouteForAuth({ children }) {
  const isAuth = Cookies.get("isAuth");

  if (!isAuth) {
    alert("Please login first");
    return <Navigate to="/login" />;
  }

  return children;
}

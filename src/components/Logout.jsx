// components/logout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Clear both localStorage and sessionStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userEmail");

    toast.info("You have been logged out!");

    // ✅ Redirect to login
    navigate("/login");
  }, [navigate]);

  return null; // No UI needed, just handles logout
};

export default Logout;

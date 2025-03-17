import TopNavigation from "../../nav/TopNav";
import { BsPlusCircleFill } from "react-icons/bs";
import Footer from "../../Footer";
import LineChart from "../../chart/LineChart";
import PieChart from "../../chart/PieChart";
import BarChart from "../../chart/BarChart";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaBullhorn, FaRegBell, FaRegCreditCard } from "react-icons/fa";

const CallbackOutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signinUser } = useAuth();
  // const { getCurrentUser } = useAuth();
  // let username = "";
  // username = getCurrentUser() || location.state.username;

  // const location = useLocation();

  useEffect(() => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("idToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("username");

    navigate("/sign-in");
  }, []);

  return (
    <div>
      <h1>welcome</h1>
    </div>
  );
};

export default CallbackOutPage;

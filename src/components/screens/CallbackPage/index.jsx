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

const CallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signinUser, callbackSAMLSSO, getCurrentUser } = useAuth();
  // const { getCurrentUser } = useAuth();
  // let username = "";
  // username = getCurrentUser() || location.state.username;

  // const location = useLocation();

  useEffect(() => {
    // async function fetchData() {
    //   const query = new URLSearchParams(location.search);

    //   const code = query.get("code");

    //   callbackSAMLSSO(code);
    //   const user = getCurrentUser();
    //   navigate("/landing", {
    //     state: {
    //       username: user,
    //     },
    //   });
    // }
    const query = new URLSearchParams(location.search);
    const username = query.get("username");
    const idToken = query.get("idToken");
    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");

    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("idToken", idToken);
    sessionStorage.setItem("refreshToken", refreshToken);

    signinUser(username);
    navigate("/landing", {
      state: {
        username: username,
      },
    });
    // fetchData();
  }, [location, signinUser, callbackSAMLSSO, getCurrentUser]);

  return (
    <div>
      <h1>welcome</h1>
    </div>
  );
};

export default CallbackPage;

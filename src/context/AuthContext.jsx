import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    // let checkInterval = 180000; //3 minutes
    let checkInterval = 30000;

    if (import.meta.env.VITE_API_INTERVAL_TIME) {
      checkInterval = import.meta.env.VITE_API_INTERVAL_TIME;
    }

    const logout = () => {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("idToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("username");
      setIsAuthenticated(false);
      setIsProtected(false);
    };

    const checkTokenValidity = async (token) => {
      try {
        const apiUrl = import.meta.env.VITE_114BK_API_URL;
        const url = apiUrl + "api/auth/check-token-validity";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-auth-token": `${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          setIsAuthenticated(true);
          setIsProtected(true);
        } else {
          // logout();
          setIsAuthenticated(false);
          setIsProtected(false);
        }
      } catch (err) {
        // logout();
        setIsAuthenticated(false);
        setIsProtected(false);
      }
    };

    const checkIdleTimeout = setInterval(() => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        checkTokenValidity(token);
      } else {
        logout();
      }
    }, checkInterval);

    return () => clearInterval(checkIdleTimeout);
  }, [lastActivityTime, navigate]);

  const resetIdleTimer = (idleTime) => {
    setLastActivityTime(idleTime);
    console.log("app_context lastActivityTime: ", lastActivityTime);
  };

  const logoutUser = () => {
    sessionStorage.removeItem("authToken");

    window.localStorage.removeItem("currentCodeframe");
    window.localStorage.removeItem("currentReviews");
    window.localStorage.removeItem("jobId");
    window.localStorage.removeItem("restoreCodeframe");
    window.localStorage.removeItem("restoreReviews");

    setIsAuthenticated(false);
    // navigate('/login');
  };

  const signoutUser = async (username) => {
    try {
      const payload = { username: username };
      const apiUrl = import.meta.env.VITE_114BK_API_URL;
      const url = apiUrl + "api/auth/logout";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("idToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("username");
      } else {
        throw Error(data);
      }
    } catch (error) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("idToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("username");
    } finally {
      setIsAuthenticated(false);
    }
  };

  const signoutSSO = async (username) => {
    try {
      const apiUrl = import.meta.env.VITE_114BK_API_URL;
      const url = apiUrl + "api/auth/logout";
      const payload = { redirect_uri: url };
      const response = await fetch(
        "http://localhost:3000/api/auth/sso-logout",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.status === 302) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("idToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("username");
      } else {
        throw Error(data);
      }
    } catch (error) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("idToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("username");
    } finally {
      setIsAuthenticated(false);
    }
  };

  const signinUser = (username) => {
    setIsAuthenticated(true);
    sessionStorage.setItem("username", username);
  };

  const signinSSO = () => {
    window.location.href = "http://localhost:3000/api/auth/sso-login";
  };

  const signinOIDCSSO = () => {
    // window.location.href = "http://localhost:3000/api/auth/sso-oidc-login";
    const apiUrl =
      import.meta.env.VITE_114BK_API_URL + "api/auth/sso-oidc-login";

    // window.open("http://localhost:3000/api/auth/sso-oidc-login", "_blank");
    window.open(apiUrl, "_blank");
  };

  const getCurrentUser = () => {
    const username = sessionStorage.getItem("username");

    return username;
  };

  const refreshAccessToken = async () => {
    try {
      const username = sessionStorage.getItem("username");
      const refreshToken = sessionStorage.getItem("refreshToken");

      const payload = { username: username, refreshToken: refreshToken };
      const apiUrl = import.meta.env.VITE_114BK_API_URL;
      const url = apiUrl + "api/auth/refresh-token";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("idToken", data.idToken);
        sessionStorage.setItem("refreshToken", data.refreshToken);
        sessionStorage.setItem("username", username);
      } else {
        throw Error(data);
      }
    } catch (error) {
      signoutUser(username);
    } finally {
      setIsAuthenticated(false);
    }
  };

  const callbackSAMLSSO = async (code) => {
    try {
      //   const apiUrl = import.meta.env.VITE_114BK_API_URL;
      //   const url = apiUrl + "api/auth/logout";
      const payload = { code: code };
      const response = await fetch("http://localhost:3000/api/auth/callback", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          // "x-auth-code": code,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("idToken", idToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("username", username);
        setIsAuthenticated(true);
      } else {
        throw Error(data);
      }
    } catch (error) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("idToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("username");
      setIsAuthenticated(false);
    } finally {
    }
  };

  // const useSessionTimeout = () => {
  //     const navigate = useNavigate();

  //     useEffect(() => {
  //         const handleActivity = () => {
  //             // Reset idle timeout on any user activity
  //             console.log("handleActivity idleTimeout: ", idleTimeout);
  //             clearTimeout(idleTimeout);
  //             idleTimeout = setTimeout(() => {
  //                 sessionStorage.removeItem("authToken");
  //                 navigate("/login");
  //             }, 5 * 60 * 1000); // 5 minutes
  //         };

  //         let idleTimeout;
  //         window.addEventListener("mousemove", handleActivity);
  //         window.addEventListener("keydown", handleActivity);

  //         return () => {
  //             clearTimeout(idleTimeout);
  //             window.removeEventListener("mousemove", handleActivity);
  //             window.removeEventListener("keydown", handleActivity);
  //         };
  //     }, [navigate]);
  // };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isProtected,
        resetIdleTimer,
        setIsAuthenticated,
        lastActivityTime,
        setLastActivityTime,
        logoutUser,
        signoutUser,
        signinUser,
        signinSSO,
        signinOIDCSSO,
        getCurrentUser,
        refreshAccessToken,
        signoutSSO,
        callbackSAMLSSO,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext);

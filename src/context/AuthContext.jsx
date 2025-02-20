import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

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
                    logout();
                }
            } catch (err) {
                logout();
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
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (response.status === 200) {
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("idToken");
                sessionStorage.removeItem("refreshToken");
            } else {
                throw Error(data);
            }

        } catch (error) {
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("idToken");
            sessionStorage.removeItem("refreshToken");
        } finally {
            setIsAuthenticated(false);
        }

    };



    const signinUser = () => {
        setIsAuthenticated(true);
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
        <AuthContext.Provider value={{ isAuthenticated, isProtected, resetIdleTimer, setIsAuthenticated, lastActivityTime, setLastActivityTime, logoutUser, signoutUser, signinUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext);


import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [lastActivityTime, setLastActivityTime] = useState(Date.now());
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
        }

        // const checkIdleTimeout = setInterval(() => {
        //     const sessionTimeout = import.meta.env.VITE_API_SESSION_TIMEOUT;
        //     if (Date.now() - lastActivityTime > sessionTimeout) {
        //         sessionStorage.removeItem("authToken");
        //         setIsAuthenticated(false);
        //         navigate('/login');
        //     }
        // }, 1000);

        let checkInterval = 1800000; //30 minutes

        if (import.meta.env.VITE_API_INTERVAL_TIME) {
            checkInterval = import.meta.env.VITE_API_INTERVAL_TIME;
        }

        const logout = () => {
            sessionStorage.removeItem("authToken");

            window.localStorage.removeItem("currentCodeframe");
            window.localStorage.removeItem("currentReviews");
            window.localStorage.removeItem("jobId");
            window.localStorage.removeItem("restoreCodeframe");
            window.localStorage.removeItem("restoreReviews");

            setIsAuthenticated(false);
            navigate('/login');
        };


        const encodeBase64 = (token) => {
            try {
                return btoa(token); // btoa() encodes a string to Base64
            } catch (e) {
                console.error("Encoding failed:", e);
                return null;
            }
        };

        // Function to decode a Base64 string
        const decodeBase64 = (encodedToken) => {
            try {
                return atob(encodedToken); // atob() decodes a Base64 string
            } catch (e) {
                console.error("Decoding failed:", e);
                return null;
            }
        };



        const otpVerifyAPI = async (token) => {
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
                    // sessionStorage.setItem("authToken", encodeBase64(token));
                    setIsAuthenticated(true);
                } else {
                    logout();
                }
            } catch (err) {
                logout();
            }
        };

        const checkIdleTimeout = setInterval(() => {
            // const token = sessionStorage.getItem("authToken");
            const token = sessionStorage.getItem("accessToken");
            if (token) {
                otpVerifyAPI(token);
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
        navigate('/login');
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
            navigate('/');
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
        <AuthContext.Provider value={{ isAuthenticated, resetIdleTimer, setIsAuthenticated, lastActivityTime, setLastActivityTime, logoutUser, signoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext);


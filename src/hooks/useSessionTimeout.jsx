import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useSessionTimeout = () => {
  const navigate = useNavigate();
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  useEffect(() => {
    const handleActivity = () => {
      // console.log("lastActivityTime: ", lastActivityTime);
      clearTimeout(idleTimeout);
      idleTimeout = Date.now();
      setLastActivityTime(idleTimeout);
    };

    let idleTimeout;

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    return () => {
      clearTimeout(idleTimeout);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [navigate, lastActivityTime]);

  return [lastActivityTime, setLastActivityTime];

};

export default useSessionTimeout;
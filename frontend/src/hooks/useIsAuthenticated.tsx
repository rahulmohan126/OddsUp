import { useEffect, useState } from "react";

export default function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const checkUserData = async () => {
      
      if (username == null) {
        setIsAuthenticated(false);
        return;
      }

      if (username.length <= 0) {
        setIsAuthenticated(false);
      }

      setIsAuthenticated(true);
    };

    checkUserData()
    // window.addEventListener("storage", checkUserData);

    // return () => {
    //   window.removeEventListener("storage", checkUserData);
    // };
  }, []);

  return isAuthenticated;
}

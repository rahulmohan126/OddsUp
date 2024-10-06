import { useEffect, useState } from "react";

export default function useIsShortAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username == null) {
      setIsAuthenticated(false);
      return;
    }

    if (username.length <= 0) {
      setIsAuthenticated(false);
    }

    setIsAuthenticated(true);
  }, []);

  return isAuthenticated;
}

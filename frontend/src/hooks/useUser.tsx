import { useEffect, useState } from "react";

export default function useUser() {
  const [username, setUsername] = useState<string>("");
  const [user_id, setUser_id] = useState<string>("");

  useEffect(() => {

    const fetchData = async () => {
      const userId = localStorage.getItem("user_id");
      const username = localStorage.getItem("username");

      if (userId && username) {
        setUser_id(userId);
        setUsername(username);
      }
    }
  }, []);

  return { username, user_id };
}

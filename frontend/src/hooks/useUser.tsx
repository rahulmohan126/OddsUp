import { useEffect, useState } from "react";

export default function useUser() {
  const [username, setUsername] = useState<string>("");
  const [user_id, setUser_id] = useState<string>("");

  useEffect(() => {
    setUser_id(localStorage.getItem("user_id") || "");
    setUsername(localStorage.getItem("username") || "");
  }, []);

  return { username, user_id };
}

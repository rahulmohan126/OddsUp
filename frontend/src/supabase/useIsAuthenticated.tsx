// useIsAuthenticated.js
import { useState, useEffect } from "react";
import supabase from "./supabaseClient.ts";

import { useNavigate } from "react-router-dom";

export const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Get the current session
    const session = supabase.auth.session();

    setIsAuthenticated(!!session);

    // Listen for changes to the auth state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        setIsAuthenticated(!!session);
        if (!session) {
          navigate("/");
        }
      }
    );

    // Cleanup the listener on unmount
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return isAuthenticated;
};

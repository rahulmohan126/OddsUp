// useIsAuthenticated.js
import { useState, useEffect } from "react";
import supabase from "./supabaseClient.ts";

import { useNavigate } from "react-router-dom";

export const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // To prevent state updates on unmounted components

    // Define an async function to get the current session
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error.message);
      }

      if (isMounted) {
        setIsAuthenticated(!!session);

        if (!session) {
          console.log("Defaulting route")
          navigate("/");
        } else {
          console.log("Authorized!")
        }
      }
    };

    // Call the async function
    getSession();

    // Listen for changes to the auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (isMounted) {
        setIsAuthenticated(!!session);

        if (!session) {
          navigate("/");
        }
      }
    });

    // Cleanup the listener on unmount
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return isAuthenticated;
};


export const useIsAuthenticatedNoReRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // To prevent state updates on unmounted components

    // Define an async function to get the current session
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error.message);
      }

      if (isMounted) {
        setIsAuthenticated(!!session);

        if (!session) {
        } else {
          console.log("Authorized!")
        }
      }
    };

    // Call the async function
    getSession();

    // Listen for changes to the auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (isMounted) {
        setIsAuthenticated(!!session);
      }
    });

    // Cleanup the listener on unmount
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return isAuthenticated;
};

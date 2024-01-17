"use client";

import { useEffect, useState } from "react";
import { supabase } from "./taskService";
import { User } from "@supabase/supabase-js";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loginWithGitHub = async () => {
    try {
      setLoading(true);
      const { data } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      setLoading(false);

      console.log({ data });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const loginWithTwitter = async () => {
    try {
      setLoading(true);
      const { data } = await supabase.auth.signInWithOAuth({
        provider: "twitter",
      });

      setLoading(false);

      console.log({ data });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.log({ error });
      }

      setLoading(false);

      alert("Sign Out");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log({ error });
        setLoading(false);
        return;
      }

      if (data) {
        setUser(data.user);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();

    if (user) {
      console.log("Logged");
    } else {
      console.log("Not Logged");
    }
  }, []);

  return { user, loading, loginWithGitHub, loginWithTwitter, signOut };
};

export default useAuth;

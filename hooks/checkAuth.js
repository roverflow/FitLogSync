import { useState, useEffect } from "react";
import { UserAuth } from "@/context/AuthContext";

const checkAuth = () => {
  const { user } = UserAuth();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
  return { loading, user };
};

export default checkAuth;

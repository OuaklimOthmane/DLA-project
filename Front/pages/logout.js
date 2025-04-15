/* eslint-disable react-hooks/exhaustive-deps */
// pages/logout.js
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { LogoutContext } from "@/contexts/LogoutContext";

const Logout = () => {
  const router = useRouter();
  const { clearUserData } = useContext(LogoutContext);

  useEffect(() => {
    localStorage.removeItem("token");
    clearUserData();
    router.push("/");
  }, []);

  return (
    <div className="logout-page">
      <p>Logout ...</p>
    </div>
  );
};

export default Logout;

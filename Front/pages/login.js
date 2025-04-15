import Login from "@/components/Login/Login";
import UserContext from "@/contexts/UserContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const userData = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in
    if (userData) {
      // Redirect to the dashboard if logged in
      router.push("/products");
    }
  }, [userData]);

  // return <Login />;

  return <>{(!userData || typeof userData === "undefined") && <Login />}</>;
};

export default LoginPage;

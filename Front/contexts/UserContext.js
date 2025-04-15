import api from "@/help/api";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { LogoutContext } from "./LogoutContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [userData, setUserData] = useState(null);
  const [loader, setloader] = useState(true);
  const router = useRouter();
  const [data, setdata] = useState("");

  useEffect(() => {
    // setdata({ loader });
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await api.get("/user/data_user");
      const data = response.data.data;
      // setUserData(data);
      // setdata(data);
      setloader(false);
      setdata({ ...data, loader: false });
    } catch (err) {
      console.log("err", err);
      router.replace("/");
    }
  };

  const clearUserData = () => {
    setdata(null);
  };

  // const data = { ...userData, loader };

  return (
    <UserContext.Provider value={data}>
      <LogoutContext.Provider value={{ clearUserData }}>
        {children}
      </LogoutContext.Provider>
    </UserContext.Provider>
  );
};

export default UserContext;

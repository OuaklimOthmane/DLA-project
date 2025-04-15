import UserContext, { UserProvider } from "@/contexts/UserContext";
import "@/styles/globals.css";
import "@/styles/Home.css";
import { useContext } from "react";

export default function App({ Component, pageProps }) {
  // const {userData}= useContext(UserContext);

  return (
    <UserProvider>
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </UserProvider>
  );
}

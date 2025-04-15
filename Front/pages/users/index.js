import SidebarLayout from "@/components/layouts/sidebar-layout/SidebarLayout";
import Users from "@/components/Users/users-list/Users";
import UserContext from "@/contexts/UserContext";
import { useContext } from "react";

const UsersPage = () => {
  const userData = useContext(UserContext);

  return (
    <>
      {!userData.loader ? (
        <>
          <Users />
        </>
      ) : (
        <h1 style={{ color: "black" }}>Loader</h1>
      )}
    </>
  );
};

UsersPage.PageLayout = SidebarLayout;

export default UsersPage;

import SidebarLayout from "@/components/layouts/sidebar-layout/SidebarLayout";
import Catalogues from "@/components/catalogues/catalogues-list/Catalogues";
import UserContext from "@/contexts/UserContext";
import { useContext } from "react";

const CataloguesPage = () => {
  const userData = useContext(UserContext);

  return (
    <>
      {!userData.loader ? (
        <>
          <Catalogues />
        </>
      ) : (
        <h1 style={{ color: "black" }}>Loader</h1>
      )}
    </>
  );
};

CataloguesPage.PageLayout = SidebarLayout;

export default CataloguesPage;

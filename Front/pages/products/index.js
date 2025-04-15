import SidebarLayout from "@/components/layouts/sidebar-layout/SidebarLayout";
import Products from "@/components/products/product-list/Products";
import UserContext from "@/contexts/UserContext";
import { useContext } from "react";

const ProductsPage = () => {
  const userData = useContext(UserContext);

  console.log("loading", userData);

  return (
    <>
      {!userData.loader ? (
        <>
          <Products />
        </>
      ) : (
        <h1 style={{ color: "black" }}>Loader</h1>
      )}
    </>
  );

  // return <Products />;
};

ProductsPage.PageLayout = SidebarLayout;

export default ProductsPage;

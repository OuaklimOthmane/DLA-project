import CataloguesIcon from "@/components/icons/CataloguesIcon";
import DashboarIcon from "@/components/icons/DashboardIcon";
import ProductsIcon from "@/components/icons/ProductsIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import UserContext from "@/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import classes from "./Sidebar.module.css";

const Sidebar = () => {
  const userData = useContext(UserContext);

  return (
    <aside className={classes.container}>
      <div className={classes.wrapper}>
        <Link className={classes.link} href="/">
          <Image
            src="/img/logo-white.png"
            className={classes.logo_container}
            height={100}
            width={100}
            alt=""
          />
        </Link>

        <ul className={classes.nav_container}>
          {/* <Link className={classes.nav_link} href="/dashboard">
            <DashboarIcon height="19" />
            Dashboard
          </Link> */}

          <Link className={classes.nav_link} href="/products">
            <ProductsIcon height="19" />
            Products
          </Link>

          <Link className={classes.nav_link} href="/catalogues">
            <CataloguesIcon height="19" />
            Catalogues
          </Link>

          {userData?.role_id == 1 && (
            <Link className={classes.nav_link} href="/users">
              <UsersIcon height="18" />
              Users
            </Link>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

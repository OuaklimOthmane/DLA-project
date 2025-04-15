import PlusIcon from "@/components/icons/PlusIcon";
import UserContext from "@/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const userData = useContext(UserContext);

  return (
    <header className={classes.container}>
      <div className={classes.wrapper}>
        {/* <button type="button" className={classes.button}>
          <PlusIcon width="12px" />
        </button> */}

        <div className={classes.profile_container}>
          <Image
            className={classes.profile_img}
            src="/img/person.jpg"
            alt="profile image"
            height={100}
            width={100}
          ></Image>
          <p className={classes.profile_name}>
            {userData.firstname} {userData.lastname}
          </p>

          <Link href="/logout" className={classes.logout}>
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

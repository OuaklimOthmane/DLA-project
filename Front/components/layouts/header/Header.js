import LogoutIcon from "@/components/icons/login-icon";
import Image from "next/image";
import Link from "next/link";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header_container}>
      <div className={classes.header_wrapper}>
        <Link className={classes.link} href="/">
          <Image
            src="/img/logo-black.png"
            className={classes.logo_container}
            height={100}
            width={100}
            alt=""
          />
        </Link>
        <Link href="/login" className={classes.header_btn}>
          Login <LogoutIcon height="15px" />
        </Link>
      </div>
    </header>
  );
};

export default Header;

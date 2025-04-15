import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import classes from "./SidebarLayout.module.css";

const SidebarLayout = ({ children }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Sidebar />
        <div className={classes.main_container}>
          <Navbar />
          <main className={classes.main_wrapper}>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;

import Header from "../layouts/header/Header";
import Hero from "./hero/Hero";
import classes from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={classes.landing_container}>
      <div className={classes.landing_wrapper}>
        <Header />
        <div className={classes.hero_wrapper}>
          <Hero />
        </div>
      </div>
    </div>
  );
};

export default Landing;

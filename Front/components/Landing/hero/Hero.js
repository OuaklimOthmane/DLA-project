import Slider from "@/components/common/slider/Slider";
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.action_container}>
          <h1 className={classes.action_title}>
            Discover.
            <br />
            Transform.
            <br />
            Elevate.
          </h1>
          {/* Welcome to our platform, where you can watch as your bathroom dreams come to life. Learn about the finest luxury products, from exquisite showers to elegant lavabos. Let us guide you on a journey of discovery, as you transform your space into a sanctuary of indulgence. Explore our catalogues and witness your bathroom aspirations elevate to new heights. It's time to watch, learn, and grow with us. */}
          <button className={classes.action_btn}>Create Catalogue</button>
        </div>
        <Slider />
      </div>
    </section>
  );
};

export default Hero;

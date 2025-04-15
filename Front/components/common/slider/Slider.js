import Image from "next/image";
import classes from "./Slider.module.css";

const Slider = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.slide}>
          <Image
            src={"/img/hero-1.jpg"}
            className={classes.slider_img}
            height={100}
            width={100}
            alt=""
          />
          <div className={classes.slide_details_container}>
            <div className={classes.slide_details}>
              <p className={classes.slide_details_title}>Lorem ipsum</p>
              <p className={classes.slide_details_price}>129.49DH</p>
            </div>
          </div>
        </div>
        <div className={classes.slide}>
          <Image
            src={"/img/hero-2.jpg"}
            className={classes.slider_img}
            height={100}
            width={100}
            alt=""
          />
          <div className={classes.slide_details_container}>
            <div className={classes.slide_details}>
              <p className={classes.slide_details_title}>Lorem ipsum</p>
              <p className={classes.slide_details_price}>129.49DH</p>
            </div>
          </div>
        </div>
        <div className={classes.slide}>
          <Image
            src={"/img/hero-3.jpg"}
            className={classes.slider_img}
            height={100}
            width={100}
            alt=""
          />
          <div className={classes.slide_details_container}>
            <div className={classes.slide_details}>
              <p className={classes.slide_details_title}>Lorem ipsum</p>
              <p className={classes.slide_details_price}>129.49DH</p>
            </div>
          </div>
        </div>
        <div className={classes.slide}>
          <Image
            src={"/img/hero-4.jpg"}
            className={classes.slider_img}
            height={100}
            width={100}
            alt=""
          />
          <div className={classes.slide_details_container}>
            <div className={classes.slide_details}>
              <p className={classes.slide_details_title}>Lorem ipsum</p>
              <p className={classes.slide_details_price}>129.49DH</p>
            </div>
          </div>
        </div>
        <div className={classes.slide}>
          <Image
            src={"/img/hero-5.jpg"}
            className={classes.slider_img}
            height={100}
            width={100}
            alt=""
          />
          <div className={classes.slide_details_container}>
            <div className={classes.slide_details}>
              <p className={classes.slide_details_title}>Lorem ipsum</p>
              <p className={classes.slide_details_price}>129.49DH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;

import classes from "./Loader.module.css";

const Loader = ({ size = "medium" }) => {
  return (
    <div className={`${classes.loader_container} ${classes[size]}`}>
      <div className={classes.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;

/* eslint-disable @next/next/no-img-element */
import classes from "./UserDetails.module.css";

const UserDetails = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.item_1}>
        <img src={"/img/person.png"} alt="" />
      </div>
      <div className={classes.item_2}>
        <p className={classes.title}>
          {props.user?.firstname ?? ""} {props.user?.lastname ?? ""}
        </p>
        <div className={classes.item}>
          <label>Email :</label>
          <p>{props?.user?.email ?? "-"}</p>
        </div>
        <div className={classes.item}>
          <label>Added by :</label>
          <p>{props?.user?.added_by ?? "-"}</p>
        </div>
        <div className={classes.item}>
          <label>Catalogues :</label>
          <p>{props.user?.catalogs?.length ?? 0}</p>
        </div>
        <div className={classes.item}>
          <label>Products :</label>
          <p>{props.products?.length ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

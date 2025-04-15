/* eslint-disable @next/next/no-img-element */
import classes from "./ProductDetails.module.css";
const BACK_API = process.env.BACK_API;

const ProductDetails = (props) => {
  return (
    // <div className={classes.container}>
    //   <div className={classes.list}>
    //     <div className={classes.item}>
    //       <label>Image</label>
    //       {/* <div className={classes.name}> */}
    //       <img src="/img/hero-1.jpeg" />
    //     </div>
    //     <div className={classes.item}>
    //       <label>Reference</label>
    //       <p>{props.product.name}</p>
    //     </div>
    //   </div>
    //   <div className={classes.list}>
    //     <div className={classes.item}>
    //       <label>Price</label>
    //       <p>{props.product.price}</p>
    //     </div>
    //     <div className={classes.item}>
    //       <label>Stock</label>
    //       <p>{props.product.stock}</p>
    //     </div>
    //   </div>
    // </div>

    <div className={classes.container}>
      <div className={classes.item_1}>
        {/* <img src={props?.product.image?.split("\\").pop()} /> */}
        <img
          // src={`/img/${props?.product.image?.split("\\").pop()}`}
          src={BACK_API + props.product?.image ?? "/img/hero-4.jpg"}
          alt=""
        />
      </div>
      <div className={classes.item_2}>
        <p className={classes.title}>{props.product.name}</p>
        <div className={classes.item}>
          <label>Stock :</label>
          <p>{props.product?.stock} </p>
        </div>
        <div className={classes.item}>
          <label>Price :</label>
          <p>{props.product?.price}</p>
        </div>
        <div className={classes.item}>
          <label>Provider :</label>
          {/* <img src={props.product?.provider} /> */}
          <p>{props.product?.provider}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

import Image from "next/image";
import classes from "./ProductCatalogue.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../../../help/api";
import { useEffect, useState } from "react";
import DeleteIcon from "@/components/icons/DeleteIcon";

const ProductCatalogue = (props) => {
  const BACK_API = process.env.BACK_API;

  const [showPrice, setShowPrice] = useState(
    // props.show_price !== undefined ? props.show_price : 1
    props.show_price
  );

  const [showProvider, setShowProvider] = useState(
    // props.show_provider !== undefined ? props.show_provider : 1
    props.show_provider
  );

  useEffect(() => {
    const handleUpdateShow = async () => {
      const payload = {
        show_price: showPrice,
        show_provider: showProvider,
      };

      try {
        const response = await api.put(`/product-groupe/${props.id}`, payload);
        props.getCataloge();
      } catch (error) {
        toast.error(error?.response?.data?.message ?? "Error change status !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    handleUpdateShow();
  }, [showPrice, showProvider]);

  const handleCheckboxChange = async (field) => {
    if (field === "show_price") {
      setShowPrice(!showPrice);
    } else if (field === "show_provider") {
      setShowProvider(!showProvider);
    }
  };

  async function deleteProduct() {
    try {
      const response = await api.delete(`/product-groupe/${props.id}`);
      if (response.status === 200) {
        toast.success("Le produit a été retiré avec succés !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      props.getCataloge();
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Error change status !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <div className={classes.container}>
      <ToastContainer />
      <div className={classes.product_header}>
        <h3 className={classes.title}>
          <img
            src={BACK_API + props?.product?.image ?? ""}
            // src={`/img/${catalogue?.cover?.split("\\").pop()}`}
            className={classes.btn_img}
            alt=""
          />
          {props?.product?.name}
        </h3>
        <button
          type="button"
          className={classes.btn_action}
          onClick={deleteProduct}
        >
          <DeleteIcon fill="#d85454" height="18px" />
        </button>
      </div>

      <div className={classes.wrapper}>
        <div className={classes.item}>
          <label className={classes.label}>Show provider</label>
          <label className={classes.toggle_switch}>
            {/* <input
              type="checkbox"
              // className={classes.toggle_input}
              onChange={changeShowProvider}
              checked={showProvider ? true : false}
              // checked={showProvider ===1}
            /> */}
            <input
              className={classes.toggle_input}
              type="checkbox"
              checked={showProvider}
              onChange={() => handleCheckboxChange("show_provider")}
            />
            <span className={classes.toggle_slider}></span>
          </label>
        </div>
        <div className={classes.item}>
          <label className={classes.label}>Show price</label>
          <label className={classes.toggle_switch}>
            {/* <input
              type="checkbox"
              // className={classes.toggle_input}
              onChange={changeShowPrice}
              checked={showPrice ? true : false}
              // checked={showPrice ===1}
            /> */}

            <input
              className={classes.toggle_input}
              type="checkbox"
              checked={showPrice}
              onChange={() => handleCheckboxChange("show_price")}
            />
            <span className={classes.toggle_slider}></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogue;

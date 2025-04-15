import classes from "./ProductModal.module.css";
import { useState } from "react";
import api from "../../../help/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductModal = (props) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(props?.product?.image ?? null);

  const id = props.id;
  // console.log("zebi", props.product, !props?.product?.id);

  const formik = useFormik({
    initialValues: {
      name: props.isEditing ? props?.product?.name : "",
      description: props.isEditing ? props?.product?.description : "",
      price: props.isEditing ? props?.product?.price : 0,
      reference: props.isEditing ? props?.product?.refrence : "",
      provider: props.isEditing ? props?.product?.provider : "",
      stock: props.isEditing ? props?.product?.stock : 0,
      // image: "",
    },
    validationSchema: Yup.object({
      name: Yup.string("Nom est obligatoire")
        .min(6, "Nom doit avoir au moins de 6 caractères")
        .required("Nom est obligatoire"),
      description: Yup.string("Description est obligatoire")
        .min(6, "Description doit avoir au moins de 6 caractères")
        .required("Description est obligatoire"),
      // image: Yup.string("Image est obligatoire").required(
      //   "Image est obligatoire"
      // ),
      price: Yup.number("Prix est obligatoire").required(
        "Prix est obligatoire"
      ),
      stock: Yup.number("Stock est obligatoire").required(
        "Stock est obligatoire"
      ),
      reference: Yup.string("Refrence est obligatoire").required(
        "Reference est obligatoire"
      ),
      provider: Yup.string("Provider est obligatoire").required(
        "Provider est obligatoire"
      ),
    }),
    onSubmit: (values) => {
      handleSubmitproduct();
    },
  });

  async function handleSubmitproduct() {
    const formData = new FormData();
    formData.append("name", formik.values.name);
    formData.append("description", formik.values.description);
    formData.append("image", image);
    formData.append("price", formik.values.price);
    formData.append("refrence", formik.values.reference);
    formData.append("provider", formik.values.provider);
    formData.append("stock", formik.values.stock);
    try {
      if (!props.isEditing) {
        const response = await api.post("/product", formData);
        if (response.status === 200) {
          toast.success("Le produit a été créé avec succés !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          clearForm();
          setTimeout(() => {
            props.onClose();
          }, 2000);
        }
      } else {
        if (props?.product?.id) {
          const response = await api.put(
            `/product/${props?.product?.id}`,
            formData
          );
          if (response.status === 200) {
            toast.success("Le produit a été modifier avec succés !", {
              position: toast.POSITION.TOP_RIGHT,
            });
            clearForm();
            setTimeout(() => {
              props.onClose();
            }, 2000);
          }
        }
      }
    } catch (error) {
      setMessage("Error creating ");
      toast.error(
        error?.response?.data?.message ?? "Erreur durant la modification  !",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  }

  async function clearForm() {
    formik.values.name = "";
    formik.values.description = "";
    formik.values.price = 0;
    formik.values.reference = "";
    formik.values.provider = "";
  }

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <ToastContainer />
      <div className={classes.form_item}>
        <label className={classes.form_label}>Name</label>
        <input
          type="text"
          className={classes.form_input}
          placeholder="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="erreur">{formik.errors.name}</div>
        ) : null}
      </div>
      <div className={classes.form_item}>
        <label className={classes.form_label}>Reference</label>
        <input
          type="text"
          className={classes.form_input}
          placeholder="Reference"
          name="reference"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.reference}
        />
        {formik.touched.reference && formik.errors.reference ? (
          <div className="erreur">{formik.errors.reference}</div>
        ) : null}
      </div>
      <div className={classes.form_item}>
        <label className={classes.form_label}>Image</label>
        <input
          type="file"
          // accept="image/*"
          className={classes.form_input}
          placeholder="Select an image"
          name="image"
          onChange={(e) => {
            // formik.handleChange;
            setImage(e.target.files[0]);
          }}
          required={!props?.product?.id ? true : false}
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.image}
          //   value={`/img/${formik.values.image?.split("\\").pop()}`}
        />
        {/* {formik.touched.image && formik.errors.image ? (
          <div className="erreur">{formik.errors.image}</div>
        ) : null} */}
      </div>
      <div className={classes.form_item}>
        <label className={classes.form_label}>Price</label>
        <input
          type="number"
          className={classes.form_input}
          placeholder="Price"
          min={0}
          name="price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price ? (
          <div className="erreur">{formik.errors.price}</div>
        ) : null}
      </div>
      <div className={classes.form_item}>
        <label className={classes.form_label}>Stock</label>
        <input
          type="number"
          className={classes.form_input}
          placeholder="Stock"
          name="stock"
          min={0}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.stock}
        />
      </div>
      <div className={classes.form_item}>
        <label className={classes.form_label}>Provider</label>
        <input
          type="text"
          className={classes.form_input}
          placeholder="Provider"
          name="provider"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.provider}
        />
        {formik.touched.provider && formik.errors.provider ? (
          <div className="erreur">{formik.errors.provider}</div>
        ) : null}
      </div>
      {/* <div className={classes.form_item}>
        <label className={classes.form_label}>Provider</label>
        <select
          className={classes.form_input}
          name="provider"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.provider}
        >
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
        {formik.touched.provider && formik.errors.provider ? (
          <div className="erreur">{formik.errors.provider}</div>
        ) : null}
      </div> */}
      <div className={classes.form_item}>
        <label className={classes.form_label}>Details</label>
        <textarea
          className={classes.form_textarea}
          placeholder="Details"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="erreur">{formik.errors.description}</div>
        ) : null}
      </div>
      <button className={`${classes.form_button} action_btn`} type="submit">
        {props.isEditing ? "Update product" : "Create product"}
      </button>
      {message && <p className="erreur">{message}</p>}
    </form>
  );
};

export default ProductModal;

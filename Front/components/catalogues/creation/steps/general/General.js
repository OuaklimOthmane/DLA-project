import classes from "./General.module.css";
import { useState, useEffect } from "react";
import api from "../../../../../help/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const General = (props) => {
  const [error, setError] = useState("");
  const [image, setImage] = useState(props?.product?.image ?? null);
  const [catalog, setCatalog] = useState(null);
  const router = useRouter();

  const getCataloge = async () => {
    try {
      const response = await api.get(
        `/cataloge/show/${router.query.id_cataloge}`
      );
      setCatalog(response.data.data);
      formik.values.title = response.data.data.title;
      setImage(response.data.data.cover);
      props.setIdCataloge(router.query.id_cataloge);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (router.query.id_cataloge) {
      getCataloge();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      // cover: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(6, "Titre doit avoir au moins de 6 caractères")
        .required("Titre est obligatoire"),
      // cover: Yup.string("Image est obligatoire").required(
      //   "Image est obligatoire"
      // ),
    }),
    onSubmit: (values) => {
      if (props.id_cataloge) {
        handleUpdate();
      } else {
        handleSave();
      }
    },
  });

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", formik.values.title);
      formData.append("cover", image);
      const response = await api.post("/cataloge", formData);
      console.log("response", response.data);
      toast.success("Cataloge ajouter avec success!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      props.setProgress(2);
      props.setIdCataloge(response.data.data.id);
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log("err", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", formik.values.title);
      formData.append("cover", image);
      const response = await api.put(
        `/cataloge/${props.id_cataloge}`,
        formData
      );
      toast.success("Cataloge modifier avec success!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      props.setProgress(2);
      props.setIdCataloge(props.id_cataloge);
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log("err", err);
    }
  };

  return (
    <section className={classes.container}>
      <ToastContainer />

      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <div className={classes.form_item}>
          <label className={classes.form_label}>Name</label>
          <input
            type="text"
            className={classes.form_input}
            name="title"
            placeholder="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="erreur">{formik.errors.title}</div>
          ) : null}
        </div>
        <div className={classes.form_item}>
          <label className={classes.form_label}>Cover</label>
          <input
            type="file"
            name="cover"
            className={classes.form_input}
            placeholder="Cover"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            required={image ? false : true}
          />
          {/* {formik.touched.cover && formik.errors.cover ? (
            <div className="erreur">{formik.errors.cover}</div>
          ) : null} */}
        </div>

        <button
          type="submit"
          className={`${classes.form_button} action_btn`}
          onClick={props.onUpgrage}
        >
          Next
        </button>
      </form>
    </section>
  );
};

export default General;

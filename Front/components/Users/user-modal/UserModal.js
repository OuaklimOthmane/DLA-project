import api from "../../../help/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import classes from "./UserModal.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserModal = (props) => {
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      firstname: props.isEditing ? props?.user?.firstname : "",
      lastname: props.isEditing ? props?.user?.lastname : "",
      email: props.isEditing ? props?.user?.email : "",
      password: "",
      password_conferm: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Mots de passe est obligatoire"),
      lastname: Yup.string().required("Mots de passe est obligatoire"),
      email: Yup.string()
        .email("Adresse e-mail invalide")
        .required("Adresse e-mail est obligatoire"),
      password: Yup.string()
        .min(6, "Le mot de passe doit être au moins de 6 caractères")
        .required("Mots de passe est obligatoire"),
      password_conferm: Yup.string()
        .required("Les mots de passe doivent correspondre")
        .oneOf(
          [Yup.ref("password"), null],
          "Les mots de passe doivent correspondre"
        ),
    }),
    onSubmit: (values) => {
      handleSubmit();
      formik.values.firstname = "";
      formik.values.lastname = "";
      formik.values.email = "";
      formik.values.password = "";
      formik.values.password_conferm = "";
    },
  });

  async function handleSubmit() {
    // e.preventDefault();
    const payload = {
      firstname: formik.values.firstname,
      lastname: formik.values.lastname,
      email: formik.values.email,
      password: formik.values.password,
      password_conferm: formik.values.password_conferm,
    };
    try {
      if (!props.isEditing) {
        const response = await api.post("/user", payload);
        if (response.status === 200) {
          toast.success("L'utilisateur a été créé avec succés !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            props.onClose();
          }, 2000);
        }
      } else {
        if (props?.user?.id) {
          const response = await api.put(`/user/${props?.user?.id}`, payload);
          if (response.status === 200) {
            toast.success("L'utilisateur a été modifier avec succés !", {
              position: toast.POSITION.TOP_RIGHT,
            });
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

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <ToastContainer />
      <div className={classes.form_item}>
        <label className={classes.form_label}>Firstname</label>
        <input
          type="text"
          className={`${classes.form_input}`}
          placeholder="Firstname"
          name="firstname"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstname}
        />
        {formik.touched.firstname && formik.errors.firstname ? (
          <div className="erreur">{formik.errors.firstname}</div>
        ) : null}
      </div>

      <div className={classes.form_item}>
        <label className={classes.form_label}>Lastname</label>
        <input
          type="text"
          className={`${classes.form_input}`}
          placeholder="Lastname"
          name="lastname"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastname}
        />
        {formik.touched.lastname && formik.errors.lastname ? (
          <div className="erreur">{formik.errors.lastname}</div>
        ) : null}
      </div>

      <div className={classes.form_item}>
        <label className={classes.form_label}>Email</label>
        <input
          type="email"
          className={`${classes.form_input}  ${
            props?.user?.id ? "disabled" : ""
          }  `}
          placeholder="Email"
          name="email"
          disabled={props?.user?.id ? true : false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="erreur">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className={classes.form_item}>
        <label className={classes.form_label}>Password</label>
        <input
          type="password"
          className={classes.form_input}
          placeholder="Type the password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="erreur">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className={classes.form_item}>
        <label className={classes.form_label}>Confirm assword</label>
        <input
          type="password"
          className={classes.form_input}
          placeholder="Retype the password"
          name="password_conferm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password_conferm && formik.errors.password_conferm ? (
          <div className="erreur">{formik.errors.password_conferm}</div>
        ) : null}
      </div>

      <button className={`${classes.form_button} action_btn`} type="submit">
        {props.isEditing ? "Update user" : "Add user"}
      </button>

      {message && <p className="erreur">{message}</p>}
    </form>
  );
};

export default UserModal;

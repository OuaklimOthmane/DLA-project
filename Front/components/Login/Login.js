import Image from "next/image";
import Link from "next/link";
import classes from "./Login.module.css";
import { useEffect, useState } from "react";
import api from "../../help/api";
import { useFormik } from "formik";
import * as Yup from "yup";
const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Adresse e-mail invalide")
        .required("Adresse e-mail est obligatoire"),
      password: Yup.string()
        .min(6, "Le mot de passe doit être au moins de 6 caractères")
        .required("Mots de passe est obligatoire"),
    }),
    onSubmit: (values) => {
      handleLogin();
    },
  });

  const handleLogin = async () => {
    try {
      const payload = {
        email: formik.values.email,
        password: formik.values.password,
      };
      const response = await api.post("/auth/login", payload);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/products";
        formik.values.password = "";
        formik.values.email = "";
      } else {
        setError("error try again");
      }
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log("err", err);
    }
  };

  return (
    <div className={classes.container}>
      <main className={classes.wrapper}>
        <section className={classes.picture_wrapper}>
          {/* <Image
            src={"/img/hero-1.jpeg"}
            alt="Pictue"
            height={100}
            width={100}
            className={classes.picture_img}
          /> */}
        </section>

        <section>
          <form
            className={classes.inputs_section}
            onSubmit={formik.handleSubmit}
          >
            <Link className={classes.link} href="/">
              <Image
                src="/img/logo-black.png"
                className={classes.logo_container}
                height={100}
                width={100}
                alt=""
              />
            </Link>
            <div className={classes.input_wrapper}>
              <input
                type="email"
                className={classes.input_container}
                placeholder="Email"
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.email && formik.errors.email ? (
                <div className="erreur">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className={classes.input_wrapper}>
              <input
                type="password"
                className={classes.input_container}
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.password && formik.errors.password ? (
                <div className="erreur">{formik.errors.password}</div>
              ) : null}
            </div>
            <button type="submit" className={classes.action_btn}>
              Login
            </button>
            {error && <p className="erreur">{error}</p>}
          </form>
        </section>
      </main>
    </div>
  );
};

export default Login;

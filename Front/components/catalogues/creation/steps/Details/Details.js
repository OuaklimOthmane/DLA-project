/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "@/components/common/modal/Modal";
import PlusIcon from "@/components/icons/PlusIcon";
import ViewIcon from "@/components/icons/ViewIcon";
import { useEffect, useState } from "react";
import classes from "./Details.module.css";
import MainCatalogue from "./main-catalogue/MainCatalogue";
import api from "../../../../../help/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import ConfirmationModal from "@/components/products/confirmation/ConfirmationModal";

const Details = (props) => {
  const [error, setError] = useState("");
  const [cataloge, setCatalog] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [editMainCatalogue, setEditMainCatalogue] = useState(false);
  const [id_main_section, setIdMainSection] = useState(null);

  const onClose = (e) => {
    setShowModal(false);
    setEditMainCatalogue(false);
    formik.values.title = "";
    setIdMainSection(null);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string("Titre est obligatoire")
        .min(6, "Titre doit être au moins de 6 caractères")
        .required("Titre est obligatoire"),
    }),
    onSubmit: (values) => {
      if (editMainCatalogue) {
        handleUpdateSectionCataloge();
      } else {
        handleSubmitSectionCataloge();
      }
    },
  });

  async function handleSubmitSectionCataloge() {
    const payload = {
      title: formik.values.title,
      cataloge_id: cataloge.id,
    };
    try {
      const response = await api.post("/section-cataloge", payload);
      await getCataloge();
      toast.success("Section cataloge ajouter avec success!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      onClose();
    } catch (error) {
      toast.error(
        err?.response?.data?.message ?? "Error ajouter Section cataloge  !",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  }

  async function handleUpdateSectionCataloge() {
    const payload = {
      title: formik.values.title,
    };
    try {
      const response = await api.put(
        `/section-cataloge/${id_main_section}`,
        payload
      );
      await getCataloge();
      toast.success("Section cataloge ajouter avec success!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      onClose();
    } catch (error) {
      toast.error(
        err?.response?.data?.message ?? "Error ajouter Section cataloge  !",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  }

  const getCataloge = async () => {
    try {
      const response = await api.get(`/cataloge/show/${props.id_cataloge}`);
      setCatalog(response.data.data);
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log("err", err);
    }
  };

  const setMain = (element) => {
    formik.values.title = element?.title;
    setIdMainSection(element?.id);
  };

  useEffect(() => {
    getCataloge();
  }, []);

  return (
    <div className={classes.container}>
      <ToastContainer />

      <button
        className={classes.details_action}
        onClick={() => setShowModal(true)}
      >
        <PlusIcon width="13px" />
        Add main section
      </button>

      <div className={classes.details_wrapper}>
        {/* { if(cataloge.sectionCatalog && cataloge.sectionCataloge?.length>0 )
        {cataloge.sectionCataloge.map((element) => {
          <MainCatalogue />;
        })}} */}

        {cataloge.sectionCataloge && cataloge.sectionCataloge?.length > 0 ? (
          cataloge.sectionCataloge.map((element) => (
            <MainCatalogue
              key={element.id}
              id={element.id}
              element={element}
              title={element.title}
              subSectionCataloge={element.subSectionCataloge}
              getCataloge={getCataloge}
              setEditMainCatalogue={setEditMainCatalogue}
              setMain={setMain}
            />
          ))
        ) : (
          <div className={classes.details_empty}>
            <h1>No main section available</h1>
          </div>
        )}
      </div>

      <button
        type="submit"
        className={`${classes.form_button} action_btn`}
        onClick={() => router.push("/catalogues/")}
      >
        Sauvegarder
      </button>

      {(showModal || editMainCatalogue) && (
        <Modal title="Add main section" onClose={onClose}>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <div className={classes.form_item}>
              <label className={classes.form_label}>Name </label>
              <input
                type="text"
                className={classes.form_input}
                name="title"
                id="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="erreur">{formik.errors.title}</div>
              ) : null}
            </div>
            <button
              className={`${classes.form_button} action_btn`}
              type="submit"
            >
              Create main section
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Details;

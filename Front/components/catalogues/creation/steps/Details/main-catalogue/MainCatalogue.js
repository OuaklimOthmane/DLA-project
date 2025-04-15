import Modal from "@/components/common/modal/Modal";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import { useState } from "react";
import SubCatalogue from "../sub-catalogue/SubCatalogue";
import classes from "./MainCatalogue.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../../../help/api";
import ConfirmationModal from "@/components/products/confirmation/ConfirmationModal";

const MainCatalogue = (props) => {
  const [toggleAccordion, setToggleAccordion] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editSubCatalogue, setEditSubCatalogue] = useState(false);
  const [id_sub_section, setIdSubSection] = useState(null);
  const [selectedMainSection, setSelectedMainSection] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleToggleAccordion = (e) => {
    e.stopPropagation();
    setToggleAccordion(!toggleAccordion);
  };

  const onClose = (e) => {
    setShowModal(false);
    setEditSubCatalogue(false);
    formik.values.title = "";
    setIdSubSection(null);
  };

  const formik = useFormik({
    initialValues: {
      titre: "",
    },
    validationSchema: Yup.object({
      title: Yup.string("Titre est obligatoire")
        .min(6, "Titre doit être au moins de 6 caractères")
        .required("Titre est obligatoire"),
    }),
    onSubmit: (values) => {
      if (editSubCatalogue) {
        handleUpdate();
      } else {
        handleSave();
      }
    },
  });

  async function handleSave() {
    const payload = {
      title: formik.values.title,
      section_cataloge_id: props.element.id,
    };
    try {
      const response = await api.post("/subsection-cataloge", payload);
      props.getCataloge();
      toast.success("Subsection catalogue ajouter avec success!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      formik.values.title = "";
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Error ajouter Subsection catalogue  !",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  }

  async function handleUpdate() {
    const payload = {
      title: formik.values.title,
      // section_cataloge_id: props.element.id,
    };
    try {
      const response = await api.put(
        `/subsection-cataloge/${id_sub_section}`,
        payload
      );
      props.getCataloge();
      toast.success("Subsection catalogue update avec success!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      formik.values.title = "";
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Error update Subsection catalogue  !",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  }

  const setSubSection = (element) => {
    formik.values.title = element?.title;
    setIdSubSection(element?.id);
  };

  const handleDelete = async (MainSection) => {
    setSelectedMainSection(MainSection);
    setIsConfirmationModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await api.delete(
        `/section-cataloge/${selectedMainSection}`
      );
      console.log("Main section deleted successfully");
      props.getCataloge();
      closeConfirmationModal();
      if (response.status === 200) {
        toast.success("Le Main section a été supprimé avec succés !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error deleting Main section:", error);
    }
  };

  const closeConfirmationModal = () => {
    console.log("close confirmation");
    setIsConfirmationModalOpen(false);
    setSelectedMainSection(null);
  };

  return (
    <div className={classes.details_item}>
      <ToastContainer />

      <div className={classes.details_main}>
        <h2 className={classes.details_main_title}>{props.element.title}</h2>
        <div className={classes.details_main_action}>
          <button
            type="button"
            className={classes.btn_action}
            onClick={() => {
              // props.setIdMainSection(props.element);
              props.setMain(props.element);
              props.setEditMainCatalogue(true);
            }}
          >
            <EditIcon fill="#d85454" height="18px" />
          </button>
          <button
            type="button"
            className={classes.btn_action}
            onClick={() => handleDelete(props.element.id)}
          >
            <DeleteIcon fill="#d85454" height="18px" />
          </button>
          <button
            type="button"
            className={`${classes.btn_action} ${
              toggleAccordion ? classes.rotate : ""
            }`}
            onClick={handleToggleAccordion}
          >
            <ArrowDownIcon fill="#d85454" height="10px" />
          </button>
        </div>
      </div>
      {toggleAccordion && (
        <div className={classes.sub_container}>
          <button
            className={classes.details_action}
            onClick={() => setShowModal(true)}
          >
            <PlusIcon width="13px" />
            Add sub section
          </button>
          <div className={classes.sub_wrapper}>
            {props.subSectionCataloge &&
              props.subSectionCataloge?.length > 0 &&
              props.subSectionCataloge.map((element) => (
                <SubCatalogue
                  key={element.id}
                  id={element.id}
                  element={element}
                  title={element.title}
                  findPoductGroup={element.findPoductGroup}
                  getCataloge={props.getCataloge}
                  setSubSection={setSubSection}
                  setEditSubCatalogue={setEditSubCatalogue}
                />
              ))}
          </div>
        </div>
      )}
      {(showModal || editSubCatalogue) && (
        <Modal title="Add main section" onClose={onClose}>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <div className={classes.form_item}>
              <label className={classes.form_label}>Name</label>
              <input
                type="text"
                className={classes.form_input}
                placeholder="Name"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <button
              className={`${classes.form_button} action_btn`}
              type="submit"
            >
              Create sub section
            </button>
          </form>
        </Modal>
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this main section?"
          onConfirm={confirmDelete}
          onCancel={closeConfirmationModal}
        />
      )}
    </div>
  );
};

export default MainCatalogue;

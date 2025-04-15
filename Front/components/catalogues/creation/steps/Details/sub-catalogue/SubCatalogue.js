/* eslint-disable @next/next/no-img-element */
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import classes from "./SubCatalogue.module.css";
import { useEffect, useState } from "react";
import PlusIcon from "@/components/icons/PlusIcon";
import ProductCatalogue from "../product-catalogue/ProductCatalogue";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import { Dropdown } from "primereact/dropdown";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import Modal from "@/components/common/modal/Modal";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../../../help/api";
import ConfirmationModal from "@/components/products/confirmation/ConfirmationModal";

const SubCatalogue = (props) => {
  const [toggleAccordion, setToggleAccordion] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const BACK_API = process.env.BACK_API;

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedMainSection, setSelectedMainSection] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const onClose = (e) => setShowModal(false);

  // const products = [
  //   { name: "Australia", code: "AU" },
  //   { name: "Brazil", code: "BR" },
  //   { name: "China", code: "CN" },
  //   { name: "Egypt", code: "EG" },
  // ];

  const handleDropdownChange = (event) => {
    setSelectedValue(event.value.id);
    console.log(selectedValue);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get(`/product`);
        setProducts(response.data.data);
      } catch (error) {
        toast.error(error?.response?.data?.message ?? "Error get products  !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    getProducts();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    const payload = {
      product_id: selectedValue,
      sub_section_cataloge_id: props.id,
    };
    try {
      const response = await api.post("/product-groupe", payload);
      props.getCataloge();
      toast.success("Product ajouter avec success!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Error ajouter products !",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  }

  // const selectedCountryTemplate = (option, props) => {
  //   if (option) {
  //     return (
  //       <div className="flex align-items-center">
  //         <img
  //           alt={option.name}
  //           src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
  //           className={`mr-2 flag flag-${option.code.toLowerCase()}`}
  //           style={{ width: "18px" }}
  //         />
  //         <div>{option.name}</div>
  //       </div>
  //     );
  //   }

  //   return <span>{props.placeholder}</span>;
  // };

  const countryOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          src={option?.image ?? ""}
          className={`mr-2 flag flag`}
          style={{ width: "18px" }}
        />
        <div>{option.refrence}</div>
      </div>
    );
  };

  const handleToggleAccordion = (e) => {
    e.stopPropagation();
    setToggleAccordion(!toggleAccordion);
  };

  // const formik = useFormik({
  //   initialValues: {
  //     titre: "",
  //   },
  //   validationSchema: Yup.object({
  //     title: Yup.string("Titre est obligatoire")
  //       .min(6, "Titre doit être au moins de 6 caractères")
  //       .required("Titre est obligatoire"),
  //   }),
  //   onSubmit: (values) => {
  //     handleSubmitSectionCataloge();
  //   },
  // });

  // async function handleSave() {
  //   const payload = {
  //     title: formik.values.title,
  //     section_cataloge_id: props.id,
  //   };
  //   try {
  //     const response = await api.post("/subsection-cataloge", payload);
  //     props.getCataloge();
  //     toast.success("Subsection cataloge ajouter avec success!", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     onClose();
  //   } catch (error) {
  //     toast.error(
  //       err?.response?.data?.message ?? "Error ajouter Subsection cataloge  !",
  //       {
  //         position: toast.POSITION.TOP_RIGHT,
  //       }
  //     );
  //   }
  // }

  const handleDelete = async (MainSection) => {
    setSelectedMainSection(MainSection);
    setIsConfirmationModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await api.delete(
        `/subsection-cataloge/${selectedMainSection}`
      );
      console.log("Sub section deleted successfully");
      props.getCataloge();
      closeConfirmationModal();
      if (response.status === 200) {
        toast.success("Le sub section a été supprimé avec succés !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error deleting sub section:", error);
    }
  };

  const closeConfirmationModal = () => {
    console.log("close confirmation");
    setIsConfirmationModalOpen(false);
    setSelectedMainSection(null);
  };

  // const selectedCountryTemplate = (option, props) => {
  //   if (option) {
  //     return (
  //       <div className="flex align-items-center">
  //         <img
  //           alt={option.name}
  //           src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
  //           style={{ width: "18px" }}
  //         />
  //         <div>{option.refrence}</div>
  //       </div>
  //     );
  //   }

  //   return <span>{props.placeholder}</span>;
  // };

  return (
    <div className={classes.details_item}>
      <ToastContainer />

      <div className={classes.sub}>
        <h2 className={classes.details_main_title}>{props.title}</h2>
        <div className={classes.details_main_action}>
          <button
            type="button"
            className={classes.btn_action}
            onClick={() => {
              props.setSubSection(props.element);
              props.setEditSubCatalogue(true);
            }}
          >
            <EditIcon fill="#d85454" height="18px" />
          </button>
          <button
            type="button"
            className={classes.btn_action}
            onClick={() => handleDelete(props.id)}
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
        <div className={classes.product_container}>
          <button
            className={classes.details_action}
            onClick={() => setShowModal(true)}
          >
            <PlusIcon width="13px" />
            Add product
          </button>
          <div className={classes.product_wrapper}>
            {props.findPoductGroup &&
              props.findPoductGroup?.length > 0 &&
              props.findPoductGroup.map((element) => (
                <ProductCatalogue
                  key={element.id}
                  product={element.product_id}
                  id={element.id}
                  getCataloge={props.getCataloge}
                  show_price={element.show_price}
                  show_provider={element.show_provider}
                  element={element}
                />
              ))}
          </div>
        </div>
      )}

      {showModal && (
        <Modal title="Add product" onClose={onClose}>
          <form className={classes.form} onSubmit={handleSave}>
            <Dropdown
              filter
              options={products}
              value={{ id: selectedValue }}
              onChange={handleDropdownChange}
              placeholder="Select a product"
              optionLabel="refrence"
              // valueTemplate={selectedCountryTemplate}
            />

            {selectedValue && (
              <div className={classes.product_displayed}>
                <img
                  src={`${BACK_API}${
                    products.find((product) => product.id === selectedValue)
                      .image
                  }`}
                  alt=""
                />
                <p>
                  {
                    products.find((product) => product.id === selectedValue)
                      ?.refrence
                  }
                </p>
              </div>
            )}

            <button
              className={`${classes.form_button} action_btn`}
              type="submit"
            >
              Create product
            </button>
          </form>
        </Modal>
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this sub section?"
          onConfirm={confirmDelete}
          onCancel={closeConfirmationModal}
        />
      )}
    </div>
  );
};

export default SubCatalogue;

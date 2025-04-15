import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import ViewIcon from "@/components/icons/ViewIcon";
import Image from "next/image";
import classes from "./Catalogues.module.css";
import { useRouter } from "next/router";
import api from "../../../help/api";
import { useContext, useEffect, useState } from "react";
import CatalogueDetails from "../catalogue-details/CatalogueDetails";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "@/components/products/confirmation/ConfirmationModal";
import UserContext from "@/contexts/UserContext";
import Loader from "@/components/common/loader/Loader";

const Catalogues = () => {
  const router = useRouter();
  const [catalogues, setCatalogues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [showCatalogue, setShowCatalogue] = useState(false);
  const [catalogue_id, setcatalogue_id] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedCatalogueId, setSelectedCatalogueId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userData = useContext(UserContext);

  useEffect(() => {
    getCatalogues();
  }, []);

  const getCatalogues = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/cataloge");
      const data = response.data.data;
      setCatalogues(data);
      console.log("successfully retrieved catalogues");
    } catch (err) {
      console.log("err", err);
      toast.error("Failed to fetch catalogues. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (catalogueId) => {
    setcatalogue_id(catalogueId);
    setShowCatalogue(true);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (catalogueId) => {
    setSelectedCatalogueId(catalogueId);
    setIsConfirmationModalOpen(true);
  };

  const handleEdit = async (catalogueId) => {
    setSelectedCatalogueId(catalogueId);
    router.push(`/edit/${catalogueId}`);
  };

  const confirmDelete = async () => {
    try {
      const response = await api.delete(`/cataloge/${selectedCatalogueId}`);
      console.log("Catalogue deleted successfully");
      getCatalogues();
      closeConfirmationModal();
      if (response.status === 200) {
        toast.success("Le catalogue a été supprimé avec succés !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error deleting catalogue:", error);
      toast.error("Failed to delete catalogue. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setSelectedCatalogueId(null);
  };

  return (
    <>
      {!showCatalogue ? (
        <main className={classes.container}>
          <ToastContainer />
          <div className={classes.wrapper}>
            <header className={classes.header}>
              <h1 className={classes.title}>Catalogues</h1>
              <div className={classes.actions}>
                <button
                  className={classes.primary_btn}
                  onClick={() => router.push("/catalogues/create")}
                >
                  <PlusIcon width="10px" /> Add catalogue
                </button>
                {toggleSearch && (
                  <input
                    className="input_filter"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                  />
                )}
                <button
                  className={classes.secondary_btn}
                  onClick={() => setToggleSearch(!toggleSearch)}
                >
                  <SearchIcon width="15px" />
                </button>

                {/* <button className={classes.secondary_btn}>
        <FilterIcon width="15px" />
      </button> */}
              </div>
            </header>
            <section className={classes.section_container}>
              <div className={classes.table_container}>
                <ul className={classes.title_list}>
                  <li className={classes.title_item}>Catalogue</li>
                  <li className={classes.title_item}>Created at</li>
                  <li className={classes.title_item}>User</li>
                  <li className={classes.title_item}>Actions</li>
                </ul>

                {isLoading ? (
                  <div className={classes.loader_wrapper}>
                    {/* <Loader size="large" /> */}
                    Loading...
                  </div>
                ) : (
                  <ul className={classes.data_list}>
                    {catalogues && catalogues.length > 0 ? (
                      catalogues
                        .filter((item) => {
                          const property1Match = item.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase());
                          const property2Match = item.user?.firstname
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase());
                          const property3Match = item.user?.lastname
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase());
                          const property4Match = new Date(item.createdAt)
                            .toLocaleString()
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase());
                          return (
                            property1Match ||
                            property2Match ||
                            property3Match ||
                            property4Match
                          );
                        })
                        .map((catalogue, i) => (
                          <li key={i} className={classes.data_item}>
                            <p className={classes.text}>{catalogue?.title}</p>
                            <p className={classes.text}>
                              {new Date(catalogue.createdAt).toLocaleString()}
                            </p>
                            <p className={classes.text}>
                              {catalogue.user?.lastname &&
                              catalogue.user?.firstname
                                ? `${catalogue.user?.firstname} ${catalogue.user?.lastname}`
                                : "--"}
                            </p>
                            <div className={classes.product_actions}>
                              <button
                                type="button"
                                className={classes.btn_action}
                                // onClick={() =>
                                //   router.push(`/catalogues/${catalogue.id}`)
                                // }
                                onClick={() => handleClick(catalogue.id)}
                              >
                                <ViewIcon fill="#d85454" height="18px" />
                              </button>
                              {/* {userData?.id == catalogue?.user?.id && ( */}
                              <button
                                type="button"
                                className={classes.btn_action}
                                onClick={() =>
                                  router.push(`catalogues/edit/${catalogue.id}`)
                                }
                              >
                                <EditIcon fill="#d85454" height="18px" />
                              </button>
                              {/* )} */}
                              {/* {userData?.id == catalogue?.user?.id && ( */}
                              <button
                                type="button"
                                className={classes.btn_action}
                                onClick={() => handleDelete(catalogue.id)}
                              >
                                <DeleteIcon fill="#d85454" height="18px" />
                              </button>
                              {/* )} */}
                            </div>
                          </li>
                        ))
                    ) : (
                      <div className="error_wrapper">
                        <p>No catalogue available for now</p>
                        <button
                          className={classes.primary_btn}
                          onClick={() => router.push("/catalogues/create")}
                        >
                          <PlusIcon width="10px" /> Add catalogue
                        </button>
                      </div>
                    )}
                  </ul>
                )}
              </div>
            </section>
          </div>

          {isConfirmationModalOpen && (
            <ConfirmationModal
              message="Are you sure you want to delete this catalogue ?"
              onConfirm={confirmDelete}
              onCancel={closeConfirmationModal}
            />
          )}
        </main>
      ) : (
        <CatalogueDetails catalogueId={catalogue_id} />
      )}
    </>
  );
};

export default Catalogues;

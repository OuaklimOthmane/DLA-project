import Modal from "@/components/common/modal/Modal";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import ViewIcon from "@/components/icons/ViewIcon";
import Image from "next/image";
import classes from "./Users.module.css";
import { useContext, useEffect, useState } from "react";
import api from "../../../help/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductDetails from "@/components/products/product-details/ProductDetails";
import UserDetails from "../user-details/UserDetails";
import UserModal from "../user-modal/UserModal";
import ConfirmationModal from "@/components/products/confirmation/ConfirmationModal";
import { toast, ToastContainer } from "react-toastify";
import UserContext from "@/contexts/UserContext";
import Loader from "@/components/common/loader/Loader";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [selectedUsertId, setSelectedUsertId] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = (e) => {
    setSelectedUser({});
    setIsOpen(false);
  };
  const [message, setMessage] = useState("");

  const userData = useContext(UserContext);

  const onCloseDetails = (e) => setIsOpenDetails(false);

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    getUsers();
  }, [isOpen]);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/user");
      const data = response.data.data;
      setUsers(data);
    } catch (err) {
      console.log("err", err);
      toast.error("Failed to fetch users. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (userId) => {
    setSelectedUsertId(userId);
    setIsConfirmationModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await api.delete(`/user/${selectedUsertId}`);
      console.log("User deleted successfully");
      getUsers();
      closeConfirmationModal();
      if (response.status === 200) {
        toast.success("L'utilisateur a été supprimé avec succés !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <main className={classes.container}>
      <ToastContainer />
      <div className={classes.wrapper}>
        <header className={classes.header}>
          <h1 className={classes.title}>Users</h1>
          <div className={classes.actions}>
            <button
              className={classes.primary_btn}
              onClick={() => setIsOpen(true)}
            >
              <PlusIcon width="10px" /> Add user
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
              <li className={classes.title_item}>User</li>
              <li className={classes.title_item}>Email</li>
              <li className={classes.title_item}>Added by</li>
              <li className={classes.title_item}>Catalogues</li>
              <li className={classes.title_item}>Products</li>
              <li className={classes.title_item}>Actions</li>
            </ul>

            {isLoading ? (
              <div className={classes.loader_wrapper}>
                {/* <Loader size="large" /> */}
                Loading...
              </div>
            ) : (
              <ul className={classes.data_list}>
                {users && users.length > 0 ? (
                  users
                    .filter((item) => {
                      const property1Match = item?.firstname
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      const property2Match = item?.lastname
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      const property3Match = item?.email
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      // const property4Match = item?.added_by
                      //   .toLowerCase()
                      //   .includes(searchTerm.toLowerCase());
                      const property5Match = item?.catalogs?.length;
                      toString()
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      const property6Match = item?.products?.length;
                      toString()
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());

                      return (
                        property1Match ||
                        property2Match ||
                        property3Match ||
                        property5Match ||
                        property6Match
                        // || property4Match
                      );
                    })
                    .map((user, i) => (
                      <li key={i} className={classes.data_item}>
                        <div className={classes.product}>
                          <div className={classes.img_wrapper}>
                            <Image
                              src={"/img/person.png"}
                              alt="product"
                              className={classes.img}
                              height={100}
                              width={100}
                            />
                          </div>
                          <p className={classes.text} title={user.firstname}>
                            {user?.firstname ?? "-"} {user?.lastname ?? "-"}
                            {/* {user.name} */}
                          </p>
                        </div>
                        <p className={classes.text} title={user.email}>
                          {user?.email ?? "--"}
                        </p>
                        <p className={classes.text} title={"admin"}>
                          {/* {"admin"} */}
                          {user?.added_by ?? "-"}
                        </p>
                        <p className={classes.text}>
                          {user?.catalogs?.length ?? 0}
                        </p>
                        <p className={classes.text}>
                          {user?.products?.length ?? 0}
                        </p>
                        <div className={classes.product_actions}>
                          <button
                            type="button"
                            className={classes.btn_action}
                            onClick={() => {
                              handleClick(user);
                              setIsEditing(true);
                              setIsOpen(true);
                            }}
                          >
                            <EditIcon fill="#d85454" height="18px" />
                          </button>
                          <button
                            type="button"
                            className={classes.btn_action}
                            onClick={() => {
                              setIsOpenDetails(true);
                              handleClick(user);
                            }}
                          >
                            <ViewIcon fill="#d85454" height="18px" />
                          </button>
                          <button
                            type="button"
                            className={classes.btn_action}
                            onClick={() => handleDelete(user.id)}
                          >
                            <DeleteIcon fill="#d85454" height="18px" />
                          </button>
                        </div>
                      </li>
                    ))
                ) : (
                  <div className="error_wrapper">
                    <p>No user available for now</p>
                    <button
                      className={classes.primary_btn}
                      onClick={() => setIsOpen(true)}
                    >
                      <PlusIcon width="10px" /> Add user
                    </button>
                  </div>
                )}
              </ul>
            )}
          </div>
        </section>
      </div>

      {isOpen && (
        <Modal title={isEditing ? "Update user" : "Add user"} onClose={onClose}>
          <UserModal
            user={selectedUser}
            isEditing={isEditing}
            onClose={onClose}
          />
        </Modal>
      )}

      {isOpenDetails && (
        <Modal title="User details" width="520px" onClose={onCloseDetails}>
          <UserDetails user={selectedUser} />
        </Modal>
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this user ?"
          onConfirm={confirmDelete}
          onCancel={closeConfirmationModal}
        />
      )}
    </main>
  );
};

export default Users;

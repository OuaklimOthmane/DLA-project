import Modal from "@/components/common/modal/Modal";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import ViewIcon from "@/components/icons/ViewIcon";
import Image from "next/image";
import classes from "./Products.module.css";
import { useContext, useEffect, useState } from "react";
import api from "../../../help/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductDetails from "../product-details/ProductDetails";
import ProductModal from "../product-modal/ProductModal";
import ConfirmationModal from "../confirmation/ConfirmationModal";
import { toast, ToastContainer } from "react-toastify";
import UserContext from "@/contexts/UserContext";
import Loader from "@/components/common/loader/Loader";

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const BACK_API = process.env.BACK_API;

  const onClose = (e) => setIsOpen(false);
  const onCloseDetails = (e) => setIsOpenDetails(false);

  // const [message, setMessage] = useState("");
  let [products, setProducts] = useState([]);
  const userData = useContext(UserContext);
  console.log("user", userData);

  useEffect(() => {
    getProducts();
  }, [isOpen]);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/product");
      const data = response.data.data;
      setProducts(data);
    } catch (err) {
      console.log("err", err);
      toast.error("Failed to fetch products. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log("getProducts");

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (productId) => {
    setSelectedProductId(productId);
    setIsConfirmationModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await api.delete(`/product/${selectedProductId}`);
      console.log("Product deleted successfully");
      getProducts(); // Fetch products again to update the table
      closeConfirmationModal();
      if (response.status === 200) {
        toast.success("Le produit a été supprimé avec succés !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const closeConfirmationModal = () => {
    console.log("close confirmation");
    setIsConfirmationModalOpen(false);
    setSelectedProductId(null);
  };

  // const filteredData = products.filter((row) => {
  //   return Object.keys(row).some((key) =>
  //     row[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });

  // function handleChange(e) {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  return (
    <main className={classes.container}>
      <ToastContainer />
      <div className={classes.wrapper}>
        <header className={classes.header}>
          <h1 className={classes.title}>Products</h1>
          <div className={classes.actions}>
            <button
              className={classes.primary_btn}
              onClick={() => {
                setIsEditing(false);
                setIsOpen(true);
              }}
            >
              <PlusIcon width="10px" /> Add product
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
              <li className={classes.title_item}>Product</li>
              <li className={classes.title_item}>Reference</li>
              <li className={classes.title_item}>Price</li>
              <li className={classes.title_item}>Provider</li>
              <li className={classes.title_item}>Stock</li>
              <li className={classes.title_item}>Actions</li>
            </ul>
            {isLoading ? (
              <div className={classes.loader_wrapper}>
                {/* <Loader size="large" /> */}
                Loading ...
              </div>
            ) : (
              <ul className={classes.data_list}>
                {products && products.length > 0 ? (
                  products
                    .filter((item) => {
                      const property1Match = item?.price
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      const property2Match = item?.name
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      const property3Match = item?.stock
                        .toString()
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      const property4Match = item?.provider
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      const property5Match = item?.refrence
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase());

                      return (
                        property1Match ||
                        property2Match ||
                        property3Match ||
                        property4Match ||
                        property5Match
                      );
                    })
                    .map((product, i) => (
                      <li key={i} className={classes.data_item}>
                        <div className={classes.product}>
                          <div className={classes.img_wrapper}>
                            <Image
                              src={
                                BACK_API + product?.image ?? "/img/hero-4.jpg"
                              }
                              // src={`/img/${product?.image?.split("\\").pop()}`}
                              alt="product"
                              className={classes.img}
                              height={100}
                              width={100}
                            />
                          </div>
                          <p className={classes.text} title={product.name}>
                            {product?.name ?? "-"}
                          </p>
                        </div>
                        <p className={classes.text}>
                          {product?.refrence ?? "-"}
                        </p>
                        <p className={classes.text}>{product?.price} Dh</p>
                        <div>
                          {/* <div className={classes.img_wrapper}>
                      <Image
                        src={"/img/person.png"}
                        alt="product"
                        className={classes.img}
                        height={100}
                        width={100}
                      />
                    </div> */}
                          <p className={classes.text}>{product?.provider}</p>
                        </div>
                        <p className={classes.text}>{product?.stock}</p>
                        <div className={classes.product_actions}>
                          <button
                            type="button"
                            className={classes.btn_action}
                            onClick={() => {
                              setIsOpenDetails(true);
                              handleClick(product);
                            }}
                          >
                            <ViewIcon fill="#d85454" height="18px" />
                          </button>
                          {/* {userData?.id == product?.user_id && ( */}
                          <button
                            type="button"
                            className={classes.btn_action}
                            onClick={() => {
                              handleClick(product);
                              setIsEditing(true);
                              setIsOpen(true);
                            }}
                          >
                            <EditIcon fill="#d85454" height="18px" />
                          </button>
                          {/* )} */}
                          {/* {userData?.id == product?.user_id && ( */}
                          <button
                            type="button"
                            className={classes.btn_action}
                            onClick={() => handleDelete(product.id)}
                          >
                            <DeleteIcon fill="#d85454" height="18px" />
                          </button>
                          {/* )} */}
                        </div>
                      </li>
                    ))
                ) : (
                  <div className="error_wrapper">
                    <p>No product available for now</p>
                    <button
                      className={classes.primary_btn}
                      onClick={() => setIsOpen(true)}
                    >
                      <PlusIcon width="10px" /> Add product
                    </button>
                  </div>
                )}
              </ul>
            )}
          </div>
        </section>
      </div>

      {isOpen && (
        <Modal
          title={isEditing ? "Update product" : "Create product"}
          onClose={onClose}
        >
          <ProductModal
            product={selectedProduct}
            isEditing={isEditing}
            onClose={onClose}
          />
        </Modal>
      )}

      {isOpenDetails && (
        <Modal title="Product details" width="400px" onClose={onCloseDetails}>
          <ProductDetails product={selectedProduct}></ProductDetails>
        </Modal>
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this product?"
          onConfirm={confirmDelete}
          onCancel={closeConfirmationModal}
        />
      )}
    </main>
  );
  // <main className={classes.container}>
  //   <ToastContainer />
  //   <div className={classes.wrapper}>
  //     <header className={classes.header}>
  //       <h1 className={classes.title}>Products</h1>
  //       <div className={classes.actions}>
  //         <button
  //           className={classes.primary_btn}
  //           onClick={() => {
  //             setIsEditing(false);
  //             setIsOpen(true);
  //           }}
  //         >
  //           <PlusIcon width="10px" /> Add product
  //         </button>
  //         {toggleSearch && (
  //           <input
  //             className="input_filter"
  //             type="text"
  //             placeholder="Search"
  //             value={searchTerm}
  //             onChange={handleChange}
  //           />
  //         )}
  //         <button
  //           className={classes.secondary_btn}
  //           onClick={() => setToggleSearch(!toggleSearch)}
  //         >
  //           <SearchIcon width="15px" />
  //         </button>

  //         {/* <button className={classes.secondary_btn}>
  //           <FilterIcon width="15px" />
  //         </button> */}
  //       </div>
  //     </header>
  //     <section className={classes.section_container}>
  //       <div className={classes.table_container}>
  //         <ul className={classes.title_list}>
  //           <li className={classes.title_item}>Product</li>
  //           <li className={classes.title_item}>Price</li>
  //           <li className={classes.title_item}>Provider</li>
  //           <li className={classes.title_item}>Stock</li>
  //           <li className={classes.title_item}>Actions</li>
  //         </ul>
  //         <ul className={classes.data_list}>
  //           {products && products.length > 0 ? (
  //             products
  //               .filter((item) => {
  //                 const property1Match = item?.price
  //                   ?.toLowerCase()
  //                   .includes(searchTerm.toLowerCase());
  //                 const property2Match = item?.name
  //                   ?.toLowerCase()
  //                   .includes(searchTerm.toLowerCase());
  //                 const property3Match = item?.stock
  //                   .toString()
  //                   ?.toLowerCase()
  //                   .includes(searchTerm.toLowerCase());
  //                 const property4Match = item?.provider
  //                   ?.toLowerCase()
  //                   .includes(searchTerm.toLowerCase());

  //                 return (
  //                   property1Match ||
  //                   property2Match ||
  //                   property3Match ||
  //                   property4Match
  //                 );
  //               })
  //               .map((product, i) => (
  //                 <li key={i} className={classes.data_item}>
  //                   <div className={classes.product}>
  //                     <div className={classes.img_wrapper}>
  //                       <Image
  //                         src={BACK_API + product?.image ?? "/img/hero-4.jpg"}
  //                         // src={`/img/${product?.image?.split("\\").pop()}`}
  //                         alt="product"
  //                         className={classes.img}
  //                         height={100}
  //                         width={100}
  //                       />
  //                     </div>
  //                     <p className={classes.text} title={product.name}>
  //                       {product?.name ?? "-"}
  //                     </p>
  //                   </div>
  //                   <p className={classes.text}>{product?.price} Dh</p>
  //                   <div>
  //                     {/* <div className={classes.img_wrapper}>
  //                     <Image
  //                       src={"/img/person.png"}
  //                       alt="product"
  //                       className={classes.img}
  //                       height={100}
  //                       width={100}
  //                     />
  //                   </div> */}
  //                     <p className={classes.text}>{product?.provider}</p>
  //                   </div>
  //                   <p className={classes.text}>{product?.stock}</p>
  //                   <div className={classes.product_actions}>
  //                     <button
  //                       type="button"
  //                       className={classes.btn_action}
  //                       onClick={() => {
  //                         setIsOpenDetails(true);
  //                         handleClick(product);
  //                       }}
  //                     >
  //                       <ViewIcon fill="#d85454" height="18px" />
  //                     </button>
  //                     {userData?.user_id == product?.user?.user_id && (
  //                       <button
  //                         type="button"
  //                         className={classes.btn_action}
  //                         onClick={() => {
  //                           handleClick(product);
  //                           setIsEditing(true);
  //                           setIsOpen(true);
  //                         }}
  //                       >
  //                         <EditIcon fill="#d85454" height="18px" />
  //                       </button>
  //                     )}
  //                     {userData?.user_id == product?.user?.user_id && (
  //                       <button
  //                         type="button"
  //                         className={classes.btn_action}
  //                         onClick={() => handleDelete(product.id)}
  //                       >
  //                         <DeleteIcon fill="#d85454" height="18px" />
  //                       </button>
  //                     )}
  //                   </div>
  //                 </li>
  //               ))
  //           ) : (
  //             <div className="error_wrapper">
  //               <p>No product available for now</p>
  //               <button
  //                 className={classes.primary_btn}
  //                 onClick={() => setIsOpen(true)}
  //               >
  //                 <PlusIcon width="10px" /> Add product
  //               </button>
  //             </div>
  //           )}
  //         </ul>
  //       </div>
  //     </section>
  //   </div>

  //   {isOpen && (
  //     <Modal
  //       title={isEditing ? "Update product" : "Create product"}
  //       onClose={onClose}
  //     >
  //       {/* <form className={classes.form} onSubmit={formik.handleSubmit}>
  //         <div className={classes.form_item}>
  //           <label className={classes.form_label}>Name</label>
  //           <input
  //             type="text"
  //             className={classes.form_input}
  //             placeholder="Name"
  //             name="name"
  //             value={formik.values.name}
  //             onChange={formik.handleChange}
  //             onBlur={formik.handleBlur}
  //           />
  //           {formik.touched.name && formik.errors.name ? (
  //             <div className="erreur">{formik.errors.name}</div>
  //           ) : null}
  //         </div>
  //         <div className={classes.form_item}>
  //           <label className={classes.form_label}>Reference</label>
  //           <input
  //             type="text"
  //             className={classes.form_input}
  //             placeholder="Reference"
  //             name="reference"
  //             onChange={formik.handleChange}
  //             onBlur={formik.handleBlur}
  //             value={formik.values.reference}
  //           />
  //           {formik.touched.reference && formik.errors.reference ? (
  //             <div className="erreur">{formik.errors.reference}</div>
  //           ) : null}
  //         </div>
  //         <div className={classes.form_item}>
  //           <label className={classes.form_label}>Image</label>
  //           <input
  //             type="file"
  //             // accept="image/*"
  //             className={classes.form_input}
  //             placeholder="Select an image"
  //             name="image"
  //             onChange={formik.handleChange}
  //             onBlur={formik.handleBlur}
  //             value={formik.values.image}
  //           />
  //           {formik.touched.image && formik.errors.image ? (
  //             <div className="erreur">{formik.errors.image}</div>
  //           ) : null}
  //         </div>
  //         <div className={classes.form_item}>
  //           <label className={classes.form_label}>Price</label>
  //           <input
  //             type="number"
  //             className={classes.form_input}
  //             placeholder="Price"
  //             min={0}
  //             name="price"
  //             onChange={formik.handleChange}
  //             onBlur={formik.handleBlur}
  //             value={formik.values.price}
  //           />
  //           {formik.touched.price && formik.errors.price ? (
  //             <div className="erreur">{formik.errors.price}</div>
  //           ) : null}
  //         </div>
  //         <div className={classes.form_item}>
  //           <label className={classes.form_label}>Stock</label>
  //           <input
  //             type="number"
  //             className={classes.form_input}
  //             placeholder="Stock"
  //             name="stock"
  //             min={0}
  //             onChange={formik.handleChange}
  //             onBlur={formik.handleBlur}
  //             value={formik.values.stock}
  //           />
  //         </div>
  //         <div className={classes.form_item}>
  //           <label className={classes.form_label}>Provider</label>
  //           <select
  //             className={classes.form_input}
  //             name="provider"
  //             onChange={formik.handleChange}
  //             onBlur={formik.handleBlur}
  //             // value={formik.values.provider}
  //           >
  //             <option value="A">A</option>
  //             <option value="B">B</option>
  //           </select>
  //           {formik.touched.provider && formik.errors.provider ? (
  //             <div className="erreur">{formik.errors.provider}</div>
  //           ) : null}
  //         </div>
  //         <div className={classes.form_item}>
  //           <label className={classes.form_label}>Details</label>
  //           <textarea
  //             className={classes.form_textarea}
  //             placeholder="Details"
  //             name="description"
  //             value={formik.values.description}
  //             onChange={formik.handleChange}
  //             onBlur={formik.handleBlur}
  //           />
  //           {formik.touched.description && formik.errors.description ? (
  //             <div className="erreur">{formik.errors.description}</div>
  //           ) : null}
  //         </div>
  //         <button
  //           className={`${classes.form_button} action_btn`}
  //           type="submit"
  //         >
  //           {isEditing ? "Update product" : "Create product"}
  //         </button>
  //         {message && <p className="erreur">{message}</p>}
  //       </form> */}
  //       <ProductModal
  //         product={selectedProduct}
  //         isEditing={isEditing}
  //         onClose={onClose}
  //       />
  //     </Modal>
  //   )}

  //   {isOpenDetails && (
  //     <Modal title="Product details" width="400px" onClose={onCloseDetails}>
  //       <ProductDetails product={selectedProduct}></ProductDetails>
  //     </Modal>
  //   )}

  //   {isConfirmationModalOpen && (
  //     <ConfirmationModal
  //       message="Are you sure you want to delete this product?"
  //       onConfirm={confirmDelete}
  //       onCancel={closeConfirmationModal}
  //     />
  //   )}
  // </main>
};

export default Products;

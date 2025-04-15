/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./Template.module.css";

const Template = ({ catalogue }) => {
  const BACK_API = process.env.BACK_API;

  return (
    <div className={styles.document}>
      <div className={styles.page_img}>
        {/* <img
          src={cat?.title ?? "/img/catalogue-main.png"}
          className={styles.main_img}
        /> */}
        <img
          src={BACK_API + catalogue?.cover ?? "/img/catalogue-main.png"}
          // src={`/img/${catalogue?.cover?.split("\\").pop()}`}
          className={styles.main_img}
          alt=""
        />
        <div className={styles.sub_img}>
          <img src="/img/logo-black.png" alt=""></img>
        </div>
      </div>

      {catalogue?.sectionCataloge &&
        catalogue?.sectionCataloge.length > 0 &&
        catalogue?.sectionCataloge.map((cat) => (
          <>
            <div className={styles.page_title}>
              <header className={styles.simple_header}>
                <img src="/img/logo-black.png" alt=""></img>
                <div className={styles.separator}></div>
              </header>
              <div className={styles.page_title_body}>
                <h1>{cat?.title ?? "-"}</h1>
              </div>
              <div className={styles.sub_img}>
                <img src="/img/logo-black.png" alt=""></img>
              </div>
            </div>
            {cat?.subSectionCataloge &&
              cat?.subSectionCataloge.length > 0 &&
              cat?.subSectionCataloge.map((sub) => (
                <>
                  {sub?.findPoductGroup &&
                    sub?.findPoductGroup.length > 0 &&
                    sub?.findPoductGroup.map((prod, j) => {
                      return j % 2 === 0 ? (
                        <div className={styles.page_products}>
                          <header className={styles.simple_header}>
                            <img src="/img/logo-black.png" alt=""></img>
                            <div className={styles.separator_wrapper}>
                              <h2 className={styles.header_title}>
                                {cat?.title} : {sub?.title}
                              </h2>
                              <div className={styles.separator}></div>
                            </div>
                          </header>

                          <div className={styles.products_container}>
                            <div className={styles.products_card}>
                              <img
                                src={
                                  BACK_API + prod?.product_id?.image ??
                                  "/img/lavabo.png"
                                }
                                alt=""
                              />
                              <h1 className={styles.product_title}>
                                {prod?.product_id?.refrence}
                              </h1>
                              <p className={styles.product_desc}>
                                {prod?.product_id?.description}
                              </p>
                              {prod?.show_price && (
                                <div className={styles.product_price}>
                                  {prod?.product_id?.price} DH HT
                                </div>
                              )}
                            </div>
                            {j + 1 < sub?.findPoductGroup.length && (
                              <div className={styles.products_card}>
                                <img
                                  src={`${
                                    BACK_API +
                                    sub?.findPoductGroup[j + 1]?.product_id
                                      ?.image
                                  }`}
                                  alt=""
                                />
                                <h1 className={styles.product_title}>
                                  {
                                    sub?.findPoductGroup[j + 1]?.product_id
                                      ?.refrence
                                  }
                                </h1>
                                <p className={styles.product_desc}>
                                  {
                                    sub?.findPoductGroup[j + 1]?.product_id
                                      ?.description
                                  }
                                </p>
                                {sub?.findPoductGroup[j + 1]?.show_price && (
                                  <div className={styles.product_price}>
                                    {
                                      sub?.findPoductGroup[j + 1]?.product_id
                                        ?.price
                                    }
                                    DH HT
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className={styles.sub_img}>
                            <img src="/img/logo-black.png" alt=""></img>
                          </div>
                        </div>
                      ) : null;
                    })}
                </>
              ))}
          </>
        ))}
    </div>
  );
};

export default Template;

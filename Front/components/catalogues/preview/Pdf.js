import React from "react";
// import Lavabo from "@/public/img/lavabo.png";
import lavabo from "../../../public/img/hero-1.jpeg";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
// import LebronStretch from "../photos/lebron_transparent.png";

const PDFFile = ({ catalogue }) => {
  const BACK_API = process.env.BACK_API;

  return (
    <>
      <Document>
        {/* <Page size="A5" orientation="landscape" style={styles.page}> */}
        <Page style={styles.page}>
          <View style={styles.image_wrapper}>
            <Image
              style={styles.main_image}
              // src={`/img/${catalogue?.cover?.split("\\").pop()}`}
              src={BACK_API + catalogue?.cover ?? "/img/catalogue-main.png"}
              alt=""
            ></Image>
            <Image
              style={styles.small_image}
              src="/img/small-black-logo.png"
              alt="Image"
              // fixed="true"
            ></Image>
          </View>
        </Page>

        {catalogue?.sectionCataloge &&
          catalogue?.sectionCataloge.length > 0 &&
          catalogue?.sectionCataloge.map((cat) => (
            <>
              <Page style={styles.page}>
                <View style={styles.main_title_container}>
                  <View style={styles.title_container}>
                    {/* <Text style={styles.primary_title}>Mizu</Text> */}
                    <View style={styles.sub_title_container}>
                      <Image
                        src="/img/logo-black.png"
                        alt="product"
                        style={styles.sub_img}
                      />
                      <View style={styles.sub_title_separator_wrapper}>
                        <View style={styles.sub_title_separator}></View>
                      </View>
                    </View>
                    <View style={styles.title_separator}></View>
                  </View>
                  <View style={styles.main_title_wrapper}>
                    <Text style={styles.main_title}>{cat?.title ?? "-"}</Text>
                  </View>
                  <Image
                    style={styles.small_image}
                    src="/img/small-black-logo.png"
                    alt="Image"
                    // fixed="true"
                  ></Image>
                </View>
              </Page>

              {cat?.subSectionCataloge &&
                cat?.subSectionCataloge.length > 0 &&
                cat?.subSectionCataloge.map((sub) => (
                  <>
                    {sub?.findPoductGroup &&
                      sub?.findPoductGroup.length > 0 &&
                      sub?.findPoductGroup.map((prod, j) => {
                        return j % 2 === 0 ? (
                          <Page size="A4" style={styles.page}>
                            <View style={styles.products_container}>
                              <View style={styles.sub_title_container}>
                                <Image
                                  src="/img/logo-black.png"
                                  alt="product"
                                  style={styles.sub_img}
                                />
                                <View
                                  style={styles.sub_title_separator_wrapper}
                                >
                                  <Text style={styles.sub_title}>
                                    {cat?.title} : {sub?.title}
                                  </Text>
                                  <View
                                    style={styles.sub_title_separator}
                                  ></View>
                                </View>
                              </View>
                              <View style={styles.products_wrapper}>
                                <View style={styles.products_card}>
                                  <Image
                                    // src="/img/lavabo.png"
                                    // src={`/img/${prod?.product_id?.image
                                    //   ?.split("\\")
                                    //   .pop()}`}
                                    src={
                                      BACK_API + prod?.product_id?.image ??
                                      "/img/lavabo.png"
                                    }
                                    alt="product"
                                    style={styles.products_img}
                                  ></Image>
                                  <Text style={styles.products_title}>
                                    {prod?.product_id?.refrence}
                                  </Text>
                                  <Text style={styles.products_desc}>
                                    {prod?.product_id?.description}
                                  </Text>
                                  {prod?.show_price && (
                                    <View style={styles.products_prix}>
                                      <Text style={styles.products_prix_text}>
                                        {prod?.product_id?.price}
                                        DH HT
                                      </Text>
                                    </View>
                                  )}
                                </View>

                                {j + 1 < sub?.findPoductGroup.length && (
                                  <View style={styles.products_card}>
                                    <Image
                                      // src="/img/lavabo.png"
                                      // src={
                                      //   BACK_API + prod?.product_id?.image ??
                                      //   "/img/lavabo.png"
                                      // }
                                      src={`${
                                        BACK_API +
                                        sub?.findPoductGroup[j + 1]?.product_id
                                          ?.image
                                      }`}
                                      alt="product"
                                      style={styles.products_img}
                                    ></Image>
                                    <Text style={styles.products_title}>
                                      {
                                        sub?.findPoductGroup[j + 1]?.product_id
                                          ?.refrence
                                      }
                                    </Text>
                                    <Text style={styles.products_desc}>
                                      {
                                        sub?.findPoductGroup[j + 1]?.product_id
                                          ?.description
                                      }
                                    </Text>
                                    {sub?.findPoductGroup[j + 1]
                                      ?.show_price && (
                                      <View style={styles.products_prix}>
                                        <Text style={styles.products_prix_text}>
                                          {
                                            sub?.findPoductGroup[j + 1]
                                              ?.product_id?.price
                                          }
                                          DH HT
                                        </Text>
                                      </View>
                                    )}
                                  </View>
                                )}
                              </View>
                              <Image
                                style={styles.small_image}
                                src="/img/small-black-logo.png"
                                alt="Image"
                                // fixed="true"
                              ></Image>
                            </View>
                          </Page>
                        ) : null;
                      })}
                  </>
                ))}
            </>
          ))}
      </Document>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    // height: "100vh",
    // padding: "25px 30px",
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    color: "black",
  },

  image_wrapper: {
    height: "100%",
    width: "100%",
  },

  main_image: {
    height: "90%",
    width: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },

  small_image: {
    height: "15px",
    width: "25px",
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: "13px",
    marginRight: "10px",
    textAlign: "end",
    // position: "fixed",
    // left: "92%",
    // top: "92%",
  },

  main_title_container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  title_container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  sub_title_container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: "16px 22px",
  },

  title_separator: {
    flex: 1,
    height: 4,
    backgroundColor: "black",
    marginLeft: 20,
  },

  sub_title_separator: {
    width: "500px",
    // flex: 1,
    height: "4px",
    // display: "block",
    marginTop: 5,
    backgroundColor: "black",
  },

  sub_title_separator_wrapper: {
    width: "500px",
    // flex: 1,
    marginLeft: 20,
  },

  primary_title: {
    fontSize: "25px",
    fontWeight: "600",
  },

  sub_title: {
    fontSize: 12,
    fontWeight: "600",
  },

  sub_img: {
    height: 24,
    width: "auto",
  },

  main_title_wrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  main_title: {
    fontSize: "28px",
    maxWidth: 450,
    textAlign: "center",
    fontWeight: "600",
    textAlign: "center",
  },

  products_container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  products_wrapper: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  products_card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  products_img: {
    height: 150,
    width: "auto",
    marginBottom: 12,
  },

  products_title: {
    fontSize: 15,
    fontWeight: 900,
    marginBottom: 4,
    maxWidth: 300,
    textAlign: "center",
  },

  products_desc: {
    fontSize: 11,
    fontWeight: "500",
    maxWidth: 200,
    textAlign: "center",
  },

  products_prix: {
    padding: "10px 30px",
    // border: "1px solid black",
    backgroundColor: "black",
    marginTop: 15,
  },

  products_prix_text: { color: "white", fontSize: 12, fontWeight: "700" },

  pageNumber: { color: "white" },
});

export default PDFFile;

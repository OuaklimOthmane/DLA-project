import React, { useEffect, useState } from "react";
// import PDFFile from "./components/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile from "./Pdf";
import api from "../../../help/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

import Template from "./Template";

const Preview = ({ catalogue }) => {
  // An error occurs since next.js renders the page server side. You cannot do that, since what <PDFDownloadLink /> does is creating a blob file on the browser with the PDF content.
  const [isClient, setIsClient] = useState(false);
  const fileName = `${
    catalogue?.title ? catalogue?.title?.replace(/ /g, "_") : "Document"
  }.pdf`;
  const BACK_API = process.env.BACK_API;
  const [idFile, setIdFile] = useState("");
  const [showDownload, setshowDownload] = useState(false);
  const [loading, setloading] = useState(false);
  const [uploading, setuploading] = useState(false);
  const [uploadFile, setuploadFile] = useState(false);
  const router = useRouter();

  // const fileName = ${catalogue?.title}.pdf;

  const [downloaddUrl, setDownloaddUrl] = useState("");
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleUploadFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const payload = new FormData();
      payload.append("pdf", file);

      setuploading(true);

      try {
        const response = await fetch(`${BACK_API}/uploadpdf`, {
          method: "POST",
          body: payload,
        });

        const data = await response.json();

        if (response.status === 200) {
          const requestBody = {
            id: data?.id,
          };
          setIdFile(data?.id);
          setshowDownload(true);
          setuploading(false);

          toast.success("Pdf uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setuploading(false);
        }
      } catch (error) {
        setuploading(false);

        console.log(error);
        toast.error("Error uploading the pdf  !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const DownloadUploadFile = async () => {
    try {
      setloading(true);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: idFile }),
      };

      // "http://localhost:8082/convert-to-pdf",
      const url_response = await fetch(
        `${BACK_API}/convert-to-pdf`,
        requestOptions
      );

      const url_data = await url_response.json();

      if (url_data?.output[0]?.uri) {
        router.push(url_data?.output[0]?.uri);
        setloading(false);
        setshowDownload(false);
        toast.success("PPT converted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (
        url_data?.output?.length == 0 &&
        url_data?.status?.code == "processing"
      ) {
        DownloadUploadFile();
      } else {
        setloading(false);
        toast.error("No link provided", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      // setshowDownload(false);
    } catch (error) {
      setloading(false);
      setshowDownload(false);
      console.log(error);
      toast.error("Error within the server  !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="App">
      <ToastContainer />

      {isClient && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h1 style={{ fontSize: "20px", fontWeight: "500", color: "black" }}>
              {catalogue?.title ?? "-"}
            </h1>
            <div className="btn_input_wrapper">
              <PDFDownloadLink
                document={<PDFFile catalogue={catalogue} />}
                // fileName={catalogue?.name ? catalogue?.name : "Document"}
                fileName={fileName}
              >
                {({ loading }) =>
                  loading ? (
                    <button className="action_btn">Loading document...</button>
                  ) : (
                    <button className="action_btn">
                      Download the catalogue
                    </button>
                  )
                }
              </PDFDownloadLink>

              {!showDownload ? (
                <button className="btn_input" disabled={loading || uploading}>
                  <input
                    type="file"
                    accept=".pdf"
                    disabled={loading || uploading}
                    onChange={handleUploadFile}
                  />
                  {loading || uploading ? "Loading..." : "Upload pdf"}
                </button>
              ) : (
                <button
                  className="btn_input"
                  disabled={loading}
                  style={{ backgroundColor: "#fe8d59" }}
                >
                  <input onClick={DownloadUploadFile} />

                  {loading ? "Loading..." : "Download ppt"}
                </button>
              )}
            </div>
          </div>
          {/* <PDFFile catalogue={catalogue} /> */}
          <Template catalogue={catalogue} />
        </div>
      )}
    </div>
  );
};

export default Preview;

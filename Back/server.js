const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const axios = require("axios");

const app = express();

config();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use("/uploads", express.static("public/uploads"));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const multer = require("multer");

// Define storage for PDF files
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  function(req, file, cb) {
    cb(null, "path_to_pdf_storage_directory");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded PDF
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".pdf");
  },
});

// Initialize multer with the PDF storage configuration
const uploadPDF = multer({ storage }).single("pdf");

// Use the uploadPDF middleware to handle PDF file uploads

app.post("/uploadpdf", async (req, res) => {
  uploadPDF(req, res, async function (err) {
    if (err) {
      // Handle the error (e.g., send an error response)
      return res.status(500).json({ error: err.message });
    }

    if (res.status(200)) {
      try {
        const inputFileUrl =
          "https://backend.buildinmorocco.com/uploads/pdf-1697743502879-234551525.pdf";

        // Create a job for conversion
        const createJobResponse = await axios.post(
          "https://api.api2convert.com/v2/jobs",
          {
            input: [
              {
                type: "remote",
                source: inputFileUrl,
              },
            ],
            conversion: [
              {
                target: "docx",
              },
            ],
          },
          {
            headers: {
              // The api key provided below is available only for 30 requests/day so when the api rejected, you can create another account using yopmail and take the API key and replace it here and below too and the other api (the link of the api key is : https://account.api2convert.com/user/apikeys)
              "x-oc-api-key": "52082a5062a292a923a812dadba595b0",
              "Content-Type": "application/json",
            },
          }
        );

        console.log("createJobResponse.data", createJobResponse.data);
        //   const jobId = createJobResponse.data.id;
        //   console.log("jobId" , jobId)

        //   // Check the job status
        //   const jobStatusResponse = await axios.get(`https://api.api2convert.com/v2/jobs/${jobId}`, {
        //     headers: {
        //       'x-oc-api-key': '819125a9e6006c67ae510987c1523256'
        //     },
        //   });

        //   console.log("obStatusResponse.data",jobStatusResponse.data)

        return res.json(createJobResponse.data);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred" });
      }
    }
  });
});

app.post("/convert-to-pdf", async (req, res) => {
  try {
    // Create a job for conversion

    const jobId = req.body.id;
    console.log("jobId", jobId);

    // Check the job status
    const jobStatusResponse = await axios.get(
      `https://api.api2convert.com/v2/jobs/${jobId}`,
      {
        // The api key provided below is available only for 30 requests/day so when the api rejected, you can create another account using yopmail and take the API key and replace it here and below too and the other api (the link of the api key is : https://account.api2convert.com/user/apikeys)
        headers: {
          "x-oc-api-key": "52082a5062a292a923a812dadba595b0",
        },
      }
    );

    console.log("obStatusResponse.data", jobStatusResponse.data);

    return res.json(jobStatusResponse.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// require("./app/routes/turorial.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/cataloge.routes")(app);
require("./app/routes/sectionCataloge.routes")(app);
require("./app/routes/subSectionCataloge.routes")(app);
require("./app/routes/productGroupe.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

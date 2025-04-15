const multer = require("multer");
const path = require("path");

console.log("im in updalo");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});
// const upload = multer({ storage });

const upload = multer({ storage }).single("image");
const uploadCoverCataloge = multer({ storage }).single("cover");

module.exports = { upload, uploadCoverCataloge };

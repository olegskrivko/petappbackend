// const multer = require("multer");

// const fileUpload = multer({
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5 MB file size limit
//   },
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/images");
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//   }),
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       // Only accept files with jpg, jpeg, or png extensions
//       return cb(new Error("Please upload an image file"));
//     }
//     cb(undefined, true); // Continue with upload
//   },
// });

// module.exports = fileUpload;
// This middleware is a configuration of the multer package that limits the file size to 5 MB and only accepts files with jpg, jpeg, or png extensions. It is exported for use in the routes that require file uploads.

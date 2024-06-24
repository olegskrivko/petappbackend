// const User = require("../../models/userModel");

// const authenticateUser = async (req, res, next) => {
//   // Assuming you have a way to get the authenticated user
//   const userId = req.headers["user-id"]; // Example header
//   if (!userId) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const user = await User.findById(userId);
//   if (!user) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   req.user = user;
//   next();
// };

// // Use this middleware in your routes
// app.use(authenticateUser);

// // new not tested middleware

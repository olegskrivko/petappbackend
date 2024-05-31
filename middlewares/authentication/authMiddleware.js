// middlewares/authentification/authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader)
    return res
      .status(401)
      .json({ message: "Authorization failed. No access tokenZZZ." });

  // Extract the token without the "Bearer " prefix
  const token = authorizationHeader.replace("Bearer ", "");

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      // Handle error
      console.log(err);
      return res
        .status(403)
        .json({ message: "Authorization failed. Could not verify token." });
    }
    // } else {
    //   console.log(decoded.foo); // bar
    // }
    req.user = decoded;
    console.log("AuthenticateToken middlware done");
    next();
  });

  // jwt.verify(
  //   token,
  //   process.env.SECRET_KEY,
  //   { algorithms: ["HS256"] },
  //   (err, user) => {
  //     if (err) {
  //       //console.error("JWT Verification Error:", err);
  //       return res.status(403).json({ message: "Forbidden" });
  //     }

  //     req.user = user;
  //     next();
  //   }
  // );
};
// const authenticateToken = (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   // Extract the token without the "Bearer " prefix
//   const tokenWithoutBearer = token.replace("Bearer ", "");
//   console.log("tokenWithoutBearer", tokenWithoutBearer);

//   jwt.verify(
//     tokenWithoutBearer,
//     process.env.SECRET_KEY, // Use your actual secret key from environment variables
//     (err, decoded) => {
//       if (err) {
//         // Handle different JWT errors
//         if (err.name === "JsonWebTokenError") {
//           return res.status(401).json({ message: "Invalid token" });
//         } else if (err.name === "TokenExpiredError") {
//           return res.status(401).json({ message: "Token has expired" });
//         } else {
//           // Handle other errors
//           //console.log(err);
//           return res.status(500).json({ message: "Internal Server Error" });
//         }
//       }

//       // Access decoded data if needed
//       console.log(decoded.email);

//       // If no error, token is valid, you can proceed
//       next();
//     }
//   );
// };

const isAuthenticated = (req, res, next) => {
  // Check if user is authenticated (token is present)
  const authorizationHeader = req.header("Authorization");
  // Extract the token without the "Bearer " prefix
  const token = authorizationHeader.replace("Bearer ", "");

  if (!token)
    return res
      .status(401)
      .json({ message: "Authorization failed. No access tokenXXX." });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res
        .status(403)
        .json({ message: "Authorization failed. Could not verify tokenYYY." });
    }

    req.user = decoded;
    console.log("isAuthenticated middlware done");
    next();
  });
};

const isPetOwner = (req, res, next) => {
  // Check if the authenticated user is the owner of the resource
  // Example: req.user.userId should match the resource owner's userId
  // if (req.user.userId !== req.params.userId) {
  //   return res.status(403).json({ message: "Forbidden - Not the owner" });
  // }

  // next();
  const { user } = req;
  const { userId } = req.params;

  if (user.userId !== userId) {
    return res.status(403).json({ message: "Forbidden - Not the owner" });
  }

  next();
};

const isAdmin = (req, res, next) => {
  // Check if the user is an admin
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    // Check if the user is an admin
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Permission denied. User is not an admin." });
    }

    // Store user information in req.user for consistency with other middlewares
    req.user = user;
    next();
  });
};

// const isReviewOwner = async (req, res, next) => {
//   try {
//     const review = await Review.findById(req.params.reviewId);

//     if (!review) {
//       return res.status(404).json({ error: "Review not found" });
//     }

//     // Check if the user making the request is the owner of the review
//     if (review.user.toString() !== req.user.id) {
//       return res.status(403).json({ error: "Permission denied" });
//     }

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

module.exports = {
  authenticateToken,
  isAuthenticated,
  isPetOwner,
  // isReviewOwner,
  isAdmin,
};

// middleware/authMiddleware.js
// const jwt = require("jsonwebtoken");

// const authenticateAndSetUser = (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//     if (err) return res.status(403).json({ message: "Forbidden" });

//     req.user = user;
//     next();
//   });
// };

// module.exports = { authenticateAndSetUser };

// const isAuthenticated = (req, res, next) => {
//   authenticateToken(req, res, (err) => {
//     if (err) return res.status(403).json({ message: "Forbidden" });
//     next();
//   });
// };

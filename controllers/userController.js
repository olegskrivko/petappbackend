// controllers/userController.js
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // console.error("Error registering user:", error);
    // res.status(500).json({ error: "Internal Server Error" });
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate token and include user data
    const token = generateToken(user);
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    // Generate and send a token for authentication
    //const token = generateToken(user);
    res.status(200).json({ token, user: userData });
    //console.log("Generated Token:", token);
    //res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function generateToken(user) {
  try {
    const secretKey = process.env.SECRET_KEY;
    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };
    // const expiresIn = "1h";
    const token = jwt.sign(payload, secretKey);
    // const token = jwt.sign(payload, secretKey, {
    //   expiresIn,
    //   algorithm: "HS256",
    // });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Error generating token");
  }
}

// Secret Key Security: Ensure that your secret key ("your-secret-key") is kept secure. It's a sensitive piece of information and should not be hardcoded in your source code. Consider using environment variables for this purpose.

// Token Expiration Time: The token expiration time is set to 1 hour ("1h"). You might want to adjust this based on your application's requirements. Shorter expiration times enhance security but might inconvenience users.

// Error Handling: Your error handling is good, but you might want to log errors or handle them in a way that doesn't expose sensitive information to users.

// Middleware for Token Verification: When users make authenticated requests to your server, you'll need middleware to verify the JWT. Consider implementing middleware that checks the token in the request header.

// HTTPS: Ensure your application is served over HTTPS in production to enhance security.

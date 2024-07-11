const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");
const crypto = require("crypto");

// Review or log the default dictionaries
// console.log(adjectives);
// console.log(colors);
// console.log(animals);
// If needed, you can add your custom words
const customAdjectives = [
  "Happy",
  "Lazy",
  "Energetic",
  "Playful",
  "Curious",
  // ... add more if needed
];

const customColors = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  // ... add more if needed
];

const customAnimals = [
  // "Husky",
  // "Labrador",
  // "Retriever",
  // "Cow",
  // "Cat",
  // "Horse",
  // "Dog",
  // "Lion",
  // "Zebra",
  // "Owl",
  "Raccoon",
  "Deer",
  "Beaver",
  // "Fox",
  "Bear",
  // ... add more if needed
];
// Helper function to generate unique username
const customConfig = {
  dictionaries: [customAdjectives, customColors, customAnimals],
  separator: "-",
  length: 3,
};

function generateUsernameComponents() {
  const baseUsername = uniqueNamesGenerator(customConfig);
  const hash = crypto.randomBytes(3).toString("hex"); // 6-character hash
  const username = `${baseUsername}-${hash}`;
  const animal = baseUsername.split(customConfig.separator).pop(); // Get the animal part of the username

  return { username, animal };
}

async function generateUniqueUsername() {
  let username;
  let animal;
  let isUnique = false;

  while (!isUnique) {
    const result = generateUsernameComponents();
    username = result.username;
    animal = result.animal;
    console.log("username", username);
    console.log("animal", animal);
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      isUnique = true;
    }
  }

  return { username, animal };
}

// Register User
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { username, animal } = await generateUniqueUsername();
    const avatarUrl = `/avatars/${animal}.png`; // Assuming avatar images are stored in the public/avatars directory

    //const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = new User({ username, email, password, avatar: avatarUrl });
    // const user = new User({
    //   username,
    //   email,
    //   password: hashedPassword,
    //   avatar: avatarUrl,
    // });
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      username,
      avatar: avatarUrl,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Register User
// const registerUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const user = new User({ username, email, password });
//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password1" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password2" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        user: {
          id: user.id,
          username: user.username,
          avatar: user.avatar, // Ensure avatar is included
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          isActive: user.isActive,
          // Include any other necessary fields
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// const deleteAccount = async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     // Assuming you have a User model and a method to find and delete users
//     const deletedUser = await User.findByIdAndDelete(userId);

//     if (!deletedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Additional cleanup or response handling as needed

//     res.json({ message: "Account deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting account:", error);
//     res.status(500).json({ error: "Failed to delete account" });
//   }
// };

// Controller function to delete user account
// const deleteAccount = async (req, res) => {
//   const userId = req.user.id; // Assuming user ID is extracted from JWT token
//   console.log("userId", userId);
//   try {
//     // Find the user by ID and delete
//     const deletedUser = await User.findByIdAndDelete(userId);
//     if (!deletedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete user account" });
//   }
// };

const deleteAccount = async (req, res) => {
  const userId = req.user.id;
  console.log("userId", userId);
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log("deletedUser", deletedUser);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user account" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  deleteAccount,
};

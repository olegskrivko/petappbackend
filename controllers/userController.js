// const Pet = require("../models/Pet");
// const Comment = require("../models/Comment");
const User = require("../models/userModel");
const Business = require("../models/businessModel");

const updateUserFields = async (req, res) => {
  const userId = req.params.userId;
  const { country, language, phone, phoneCode } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        country,
        language,
        phone,
        phoneCode,
      },
      { new: true } // Return updated user document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Send updated user object as response
  } catch (error) {
    console.error("Update user fields error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const favoritedPets = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("favoritedPets"); // Assuming favoritedPets is a reference to another collection
    console.log("userId", userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.favoritedPets);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const ownedPets = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("ownedPets");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.ownedPets);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const addFavorite = async (req, res) => {
  try {
    const userId = req.params.userId;
    const petId = req.params.petId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favoritedPets.includes(petId)) {
      user.favoritedPets.push(petId);
      await user.save();
      return res.status(200).json({
        message: "Pet added to favorites",
        favoritedPets: user.favoritedPets,
      });
    } else {
      return res.status(400).json({ message: "Pet is already in favorites" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { userId, petId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const petIndex = user.favoritedPets.indexOf(petId);
    if (petIndex !== -1) {
      user.favoritedPets.splice(petIndex, 1);
      await user.save();
      return res.status(200).json({ message: "Pet removed from favorites" });
    } else {
      return res.status(400).json({ message: "Pet not found in favorites" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Get all businesses for a specific user
// const getBusinessesByUserId = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const businesses = await Business.find({ owner: userId }).populate(
//       "servicesOffered"
//     );

//     if (!businesses) {
//       return res
//         .status(404)
//         .json({ message: "No businesses found for this user." });
//     }

//     res.status(200).json(businesses);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = {
  updateUserFields,
  favoritedPets,
  ownedPets,
  addFavorite,
  removeFavorite,
  // getBusinessesByUserId,
};

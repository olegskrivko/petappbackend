// controllers/petController.js
const Pet = require("../models/petModel");
const User = require("../models/userModel");

// Get all pets
async function getPets(req, res) {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get a single pet by ID
async function getPetById(req, res) {
  try {
    const pet = await Pet.findById(req.params.id)
      .populate("author")
      .populate("locationHistory.userId");
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Increment views by 1
    pet.views++;
    await pet.save();
    res.status(200).json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new pet
async function createPet(req, res) {
  try {
    // Extracting data from the request body
    const {
      initialStatus,
      category,
      identifier,
      size,
      gender,
      behavior,
      age,
      breed,
      health,
      healthDetails,
      location,
      mainColor,
      markingPattern,
      markingColors,
      date,
      time,
      mainImage,
      phoneCode,
      phone,
      email,
      notes,
      updatedStatus,
      updatedStatusDescription,
      comments,
      locationHistory,
      isPublic,
      isClosed,
      author,
    } = req.body;

    // Ensure that the userId is included in the request body
    //const userId = req.user._id; // Assuming userId is available in req.user._id

    // Verify that the userId exists in the database
    const existingUser = await User.findById(author);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const clientData = req.body;
    console.log("clientData", clientData);
    // Extract latitude and longitude from petLocation
    const { lat, lng } = location;

    // Creating a new Pet instance with name, category, purchaseLink and slug
    const pet = new Pet({
      initialStatus,
      category,
      identifier,
      size,
      gender,
      behavior,
      age,
      breed,
      health,
      healthDetails,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
      mainColor,
      markingPattern,
      markingColors,
      date,
      time,
      mainImage,
      phoneCode,
      phone,
      email,
      notes,
      updatedStatus,
      updatedStatusDescription,
      // comments: commentEntries,
      // locationHistory: locationHistoryEntries,
      isPublic,
      isClosed,
      author: existingUser._id,
    });

    console.log("pet", pet);
    // Saving the new Pet to the database
    const savedPet = await pet.save();

    res.status(201).json(savedPet);
  } catch (error) {
    console.error("Error creating pet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing pet
async function updatePet(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedPet = await Pet.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json(updatedPet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a pet
async function deletePet(req, res) {
  const { id } = req.params;

  try {
    await Pet.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};

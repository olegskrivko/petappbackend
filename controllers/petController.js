// controllers/petController.js
const Pet = require("../models/petModel");

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
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pet" });
  }
}

// Create a new pet
async function createPet(req, res) {
  try {
    // Extracting data from the request body
    const {
      petStatus,
      petCategory,
      petIdentifier,
      petSize,
      petGender,
      petBehavior,
      petAge,
      petBreed,
      healthIssues,
      otherHealthIssues,
      petLocation,
      markingPattern,
      mainColor,
      markingColors,
      petLostOrFoundDate,
      petLostOrFoundTime,
      petImage,
      contactPhone,
      selectedCoatPattern,
      petColor,
      contactEmail,
      notes,

      // petCoatLength,
    } = req.body;

    // Extract latitude and longitude from petLocation
    const { lat, lng } = petLocation;

    // Create a location object
    // const location = {
    //   type: "Point",
    //   coordinates: [lng, lat], // Note: Longitude first, then latitude
    // };

    const me = req.body;
    console.log("me", me);
    // Creating a new Pet instance with name, category, purchaseLink and slug
    const pet = new Pet({
      petStatus,
      petCategory,
      petIdentifier,
      petSize,
      petGender,
      petBehavior,
      petAge,
      petBreed,
      healthIssues,
      otherHealthIssues,
      location: {
        // Construct the location object inline
        type: "Point",
        coordinates: [lng, lat], // Longitude first, then latitude
      },
      markingPattern,
      mainColor,
      markingColors,
      petLostOrFoundDate,
      petLostOrFoundTime,
      petImage,
      contactPhone,
      selectedCoatPattern,
      petColor,
      contactEmail,
      notes,
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

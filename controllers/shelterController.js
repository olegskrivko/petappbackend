// PATH: /controllers/shelterController.js

const Shelter = require("../models/shelterModel");
const slugify = require("slugify");

// Get all shelters
exports.getAllShelters = async (req, res) => {
  try {
    const shelters = await Shelter.find();
    res.status(200).json(shelters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shelters", error });
  }
};

// Create a new shelter
exports.createShelter = async (req, res) => {
  try {
    const {
      name,
      businessForm,
      registrationNumber,
      description,
      isActive,
      website,
      logo,
      address,
      city,
      state,
      country,
      zipCode,
      latitude,
      longitude,
      phone,
      email,
      socialMediaProfiles,
      photos,
      tags,
      totalAnimals,
      adoptedAnimals,
    } = req.body;

    console.log("body", req.body);

    // Create the addressDetails and location objects
    const addressDetails = {
      address,
      city,
      state,
      country,
      zipCode,
    };

    const location = {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)], // longitude first, then latitude
    };

    const contact = {
      phone,
      email,
    };

    // Create the new Shelter document
    const newShelter = new Shelter({
      name,
      businessForm,
      registrationNumber,
      description,
      isActive,
      website,
      logo,
      addressDetails,
      location,
      contact,
      socialMediaProfiles,
      photos,
      tags,
      totalAnimals,
      adoptedAnimals,
    });

    // Save the shelter document to the database
    await newShelter.save();
    res.status(201).json(newShelter);
  } catch (error) {
    res.status(500).json({ message: "Error creating shelter", error });
  }
};

// Get shelter by slug
exports.getShelterById = async (req, res) => {
  try {
    // Find shelter by ID and populate related data
    const shelter = await Shelter.findById(req.params.id)
      .populate("socialMediaProfiles.platform", "name iconUrl") // Populate platform name and iconUrl
      .exec();

    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }
    res.status(200).json(shelter);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shelter", error });
  }
};

// Update an existing shelter
exports.updateShelter = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedShelter = await Shelter.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedShelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }
    res.status(200).json(updatedShelter);
  } catch (error) {
    res.status(500).json({ message: "Error updating shelter", error });
  }
};

// Delete a shelter
exports.deleteShelter = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShelter = await Shelter.findByIdAndDelete(id);
    if (!deletedShelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }
    res.status(200).json({ message: "Shelter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting shelter", error });
  }
};

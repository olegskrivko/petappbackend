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
      description,
      author,
      website,
      coverPicture,
      addressDetails,
      location,
      contact,
      socialMedia,
      services,
      tags,
    } = req.body;

    console.log("body", req.body);

    // Generate slug from the name
    const slug = slugify(name, { lower: true, strict: true });

    const newShelter = new Shelter({
      slug, // Include the generated slug
      name,
      description,
      author,
      website,
      coverPicture,
      addressDetails,
      location,
      contact,
      socialMedia,
      services,
      tags,
    });

    await newShelter.save();
    res.status(201).json(newShelter);
  } catch (error) {
    res.status(500).json({ message: "Error creating shelter", error });
  }
};
// Get shelter by slug
exports.getShelterById = async (req, res) => {
  try {
    const { slug } = req.params;
    const shelter = await Shelter.findOne({ slug });
    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }
    res.status(200).json(shelter);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shelter", error });
  }
};

// Get shelter by slug
exports.getShelterById = async (req, res) => {
  try {
    const { slug } = req.params;
    const shelter = await Shelter.findOne({ slug });
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

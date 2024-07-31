const Infrastructure = require("../models/infrastructureModel"); // Update the path as needed
const Category = require("../models/categoryModel"); // Ensure you import the Category model
// Create a new Infrastructure
// exports.createInfrastructure = async (req, res) => {
//   try {
//     const infrastructure = new Infrastructure(req.body);
//     const savedInfrastructure = await infrastructure.save();
//     res.status(201).json(savedInfrastructure);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
// Create a new Infrastructure
// Create a new Infrastructure
exports.createInfrastructure = async (req, res) => {
  try {
    const {
      category,
      name,
      address,
      location,
      phone,
      email,
      website,
      workingHours,
      image,
    } = req.body;
    console.log("req.body", req.body);
    // Validate category
    const validCategory = await Category.findById(category);
    if (!validCategory) {
      return res.status(400).json({ error: "Invalid category ID" });
    }
    console.log("validCategory", validCategory);
    // Validate location
    if (
      !location ||
      !location.coordinates ||
      location.coordinates.length !== 2
    ) {
      return res.status(400).json({ error: "Invalid location coordinates" });
    }

    // Create new infrastructure
    const infrastructure = new Infrastructure({
      category,
      name,
      address,
      location,
      phone,
      email,
      website,
      workingHours,
      image,
    });
    console.log("infrastructure", infrastructure);
    const savedInfrastructure = await infrastructure.save();
    res.status(201).json(savedInfrastructure);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Infrastructures
exports.getAllInfrastructures = async (req, res) => {
  try {
    const infrastructures = await Infrastructure.find().populate("category");
    res.status(200).json(infrastructures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Infrastructure by ID
exports.getInfrastructureById = async (req, res) => {
  try {
    const { id } = req.params;
    const infrastructure = await Infrastructure.findById(id).populate(
      "category"
    );
    if (!infrastructure) {
      return res.status(404).json({ message: "Infrastructure not found" });
    }
    res.status(200).json(infrastructure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an Infrastructure by ID
exports.updateInfrastructureById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const infrastructure = await Infrastructure.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!infrastructure) {
      return res.status(404).json({ message: "Infrastructure not found" });
    }
    res.status(200).json(infrastructure);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an Infrastructure by ID
exports.deleteInfrastructureById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInfrastructure = await Infrastructure.findByIdAndDelete(id);
    if (!deletedInfrastructure) {
      return res.status(404).json({ message: "Infrastructure not found" });
    }
    res.status(200).json({ message: "Infrastructure deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

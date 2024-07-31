const ServiceCategory = require("../models/serviceCategoryModel");
const slugify = require("slugify");

// Create a new service category
const createServiceCategory = async (req, res) => {
  try {
    const { value, name, description, tags, image, isActive, priority } =
      req.body;

    // Check if English name is provided
    if (!name.en) {
      return res.status(400).json({ error: "English name is required" });
    }

    // Check if numeric value is provided
    if (value === undefined || value === null) {
      return res.status(400).json({ error: "Value is required" });
    }

    // Ensure the numeric value is unique
    const existingCategory = await ServiceCategory.findOne({ value });
    if (existingCategory) {
      return res.status(400).json({ error: "Value already exists" });
    }

    // Generate slug from English name using slugify
    const slug = slugify(name.en, { lower: true, strict: true });

    // Create new service category
    const newCategory = new ServiceCategory({
      value,
      name,
      description,
      tags,
      image,
      isActive,
      priority,
      slug,
    });

    // Save to database
    await newCategory.save();

    res.status(201).json({
      message: "Service category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating service category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all service categories
const getAllServiceCategories = async (req, res) => {
  try {
    const categories = await ServiceCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching service categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a service category by slug
const getServiceCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await ServiceCategory.findOne({ slug });

    if (!category) {
      return res.status(404).json({ error: "Service category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching service category by slug:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a service category
const updateServiceCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const updates = req.body;

    if (updates.name && updates.name.en) {
      // Generate new slug if English name is updated
      updates.slug = slugify(updates.name.en, { lower: true, strict: true });
    }

    const updatedCategory = await ServiceCategory.findOneAndUpdate(
      { slug },
      updates,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Service category not found" });
    }

    res.status(200).json({
      message: "Service category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating service category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a service category
const deleteServiceCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const deletedCategory = await ServiceCategory.findOneAndDelete({ slug });

    if (!deletedCategory) {
      return res.status(404).json({ error: "Service category not found" });
    }

    res.status(200).json({ message: "Service category deleted successfully" });
  } catch (error) {
    console.error("Error deleting service category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createServiceCategory,
  getAllServiceCategories,
  getServiceCategoryBySlug,
  updateServiceCategory,
  deleteServiceCategory,
};

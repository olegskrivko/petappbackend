// const Service = require("../models/serviceModel");
// const slugify = require("slugify");

// exports.createService = async (req, res) => {
//   try {
//     const { name, description, icon } = req.body;
//     console.log("req.body", req.body);
//     const slug = slugify(name, { lower: true });
//     const service = new Service({ name, slug, description, icon });
//     await service.save();
//     res.status(201).json(service);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getAllServices = async (req, res) => {
//   try {
//     const services = await Service.find();
//     res.status(200).json(services);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getServiceBySlug = async (req, res) => {
//   try {
//     const service = await Service.findOne({ slug: req.params.slug });
//     if (!service) return res.status(404).json({ error: "Service not found" });
//     res.status(200).json(service);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateServiceBySlug = async (req, res) => {
//   try {
//     const { name, description, icon } = req.body;
//     const service = await Service.findOneAndUpdate(
//       { slug: req.params.slug },
//       { name, description, icon },
//       { new: true }
//     );
//     if (!service) return res.status(404).json({ error: "Service not found" });
//     res.status(200).json(service);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteServiceBySlug = async (req, res) => {
//   try {
//     const service = await Service.findOneAndDelete({ slug: req.params.slug });
//     if (!service) return res.status(404).json({ error: "Service not found" });
//     res.status(200).json({ message: "Service deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const Service = require("../models/serviceModel");

const streamifier = require("streamifier");

const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");

// Promisify the upload stream
const uploadStream = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "services",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Controller to add a new service
exports.addService = async (req, res) => {
  try {
    const { name, tags, isActive, priority } = req.body;
    console.log("req.body", req.body);
    // Ensure name and tags have the correct structure
    if (!name.en || !name.ru || !name.lv) {
      return res
        .status(400)
        .json({ message: "Name in all languages is required." });
    }
    // Handle image upload to Cloudinary
    let mainImageUrl = null;
    if (req.file) {
      try {
        const result = await uploadStream(req.file.buffer);
        mainImageUrl = result.secure_url;
      } catch (error) {
        throw new Error("Failed to upload image to Cloudinary");
      }
    }

    // Create a new service with the provided data
    const newService = new Service({
      name,
      tags,
      image: mainImageUrl,
      isActive: isActive !== undefined ? isActive : true, // Default to true if not provided
      priority: priority !== undefined ? priority : 0, // Default to 0 if not provided
    });

    console.log(newService, "newService");
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Error adding service", error });
  }
};

// Controller to get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
};

// Controller to get a service by ID
exports.getServiceById = async (req, res) => {
  try {
    console.log("hit route");
    const service = await Service.findById(req.params.id);
    console.log("service", service);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service", error });
  }
};

// Controller to update a service by ID
exports.updateService = async (req, res) => {
  try {
    const { name, tags, image } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { name, tags, image },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error });
  }
};

// Controller to delete a service by ID
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error });
  }
};

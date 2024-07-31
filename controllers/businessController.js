const Business = require("../models/businessModel");
const User = require("../models/userModel");
// businessController.js
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinaryConfig");

const uploadStream = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "pets",
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

exports.createBusiness = async (req, res) => {
  try {
    // Destructure and transform data from req.body
    const {
      name,
      category,
      description,

      tags = [], // Default to empty array if not provided
      website,
      facebook,
      instagram,
      linkedin,
      youtube,
      tiktok,
      x,
      pinterest,
      whatsapp,
      //servicesOffered = [], // Default to empty array if not provided
      userId,
      locations = [], // Default to empty array if not provided
    } = req.body;

    console.log("req.body", req.body);

    // Validate input
    if (!name || !category || !userId) {
      return res
        .status(400)
        .json({ message: "Name, category, and userId are required" });
    }

    let mainImageUrl = null;
    if (req.file) {
      try {
        const result = await uploadStream(req.file.buffer);
        mainImageUrl = result.secure_url;
      } catch (error) {
        throw new Error("Failed to upload image to Cloudinary");
      }
    }

    console.log("mainImageUrl", req.file);
    // Transform locations to match the schema
    const transformedLocations = locations.map((loc) => ({
      name: loc.name || "",
      description: loc.description || "",
      coordinates: [
        parseFloat(loc.latitude) || 0, // Convert to number or default to 0
        parseFloat(loc.longitude) || 0, // Convert to number or default to 0
      ],
      phone: loc.phone || "",
      email: loc.email || "",
      monday: loc.monday || "",
      tuesday: loc.tuesday || "",
      wednesday: loc.wednesday || "",
      thursday: loc.thursday || "",
      friday: loc.friday || "",
      saturday: loc.saturday || "",
      sunday: loc.sunday || "",
      address: loc.street || "", // Assuming `address` should be `street`
      city: loc.city || "",
      state: loc.state || "",
      zipCode: loc.zipCode || "",
      country: loc.country || "",
      season: loc.season || [], // Default to empty array if not provided
    }));

    // Create new business object
    const business = new Business({
      name,
      category, // Assuming 'category' is the ID of a Category model
      description,
      image: mainImageUrl,
      tags,
      website: website || "",
      socialMedia: {
        facebook: facebook || "",
        instagram: instagram || "",
        linkedin: linkedin || "",
        youtube: youtube || "",
        tiktok: tiktok || "",
        x: x || "",
        pinterest: pinterest || "",
        whatsapp: whatsapp || "",
      },
      servicesOffered: category || "", // Pass the services offered directly if it's already an array
      locations: transformedLocations,
      owner: userId, // This should match your user model or authentication
    });

    console.log("business", business);

    // Save business to database
    await business.save();
    res.status(201).json(business);
  } catch (error) {
    console.error("Error creating business:", error);
    res.status(500).json({ error: error.message });
  }
};
// exports.createBusiness = async (req, res) => {
//   try {
//     const {
//       name,
//       address,
//       city,
//       state,
//       zipCode,
//       country,
//       phone,
//       email,
//       website,
//       openingHours,
//       servicesOffered,
//       location,
//       image,
//     } = req.body;
//     console.log(" req.body", req.body);
//     const business = new Business({
//       name,
//       address,
//       city,
//       state,
//       zipCode,
//       country,
//       phone,
//       email,
//       website,
//       openingHours,
//       servicesOffered,
//       location,
//       image,
//     });

//     await business.save();
//     res.status(201).json(business);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.updateBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;
    const updates = req.body;
    const business = await Business.findByIdAndUpdate(businessId, updates, {
      new: true,
    });
    if (!business) return res.status(404).json({ error: "Business not found" });
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;
    const business = await Business.findByIdAndDelete(businessId);
    if (!business) return res.status(404).json({ error: "Business not found" });
    res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBusinessById = async (req, res) => {
  try {
    const { businessId } = req.params;
    console.log("businessId", businessId);
    const business = await Business.findById(businessId);
    console.log("business", business);
    if (!business) return res.status(404).json({ error: "Business not found" });
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/businessController.js

// exports.getBusinessesByServiceId = async (req, res) => {
//   try {
//     const { serviceId } = req.params;
//     console.log("serviceId", serviceId);

//     // Validate serviceId (ensure it's a valid ObjectId)
//     // if (!mongoose.Types.ObjectId.isValid(serviceId)) {
//     //   return res.status(400).json({ error: "Invalid service ID" });
//     // }

//     // // Fetch businesses where the serviceId is included in the servicesOffered array
//     // const businesses = await Business.find({
//     //   servicesOffered: { $in: mongoose.Types.ObjectId(serviceId) },
//     // });

//     // console.log("businesses", businesses);

//     const businesses = await Business.find({
//       servicesOffered: { $in: [serviceId] },
//     });

//     if (businesses.length === 0) {
//       return res
//         .status(404)
//         .json({ error: "No businesses found for this service ID" });
//     }

//     res.status(200).json(businesses);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.getBusinessesByServiceId = async (req, res) => {
  try {
    const { serviceId } = req.params;
    console.log("serviceId", serviceId);

    // Ensure serviceId is a valid number
    // if (isNaN(serviceId)) {
    //   return res.status(400).json({ error: "Invalid service ID" });
    // }

    // Convert serviceId to a number
    // const serviceIdNumber = parseInt(serviceId, 10);

    // Fetch businesses where the serviceIdNumber is included in the servicesOffered array
    const businesses = await Business.find({
      servicesOffered: { $in: [serviceId] },
    });

    console.log("businesses", businesses);

    if (businesses.length === 0) {
      return res
        .status(404)
        .json({ error: "No businesses found for this service ID" });
    }

    res.status(200).json(businesses);
  } catch (error) {
    console.error("Error fetching businesses by service ID:", error);
    res.status(500).json({ error: error.message });
  }
};

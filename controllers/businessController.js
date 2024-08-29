// const Business = require("../models/businessModel");
// const User = require("../models/userModel");
// // businessController.js
// const streamifier = require("streamifier");
// const cloudinary = require("../config/cloudinaryConfig");

// const uploadStream = (fileBuffer) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       {
//         resource_type: "image",
//         folder: "pets",
//       },
//       (error, result) => {
//         if (error) {
//           return reject(error);
//         }
//         resolve(result);
//       }
//     );
//     streamifier.createReadStream(fileBuffer).pipe(stream);
//   });
// };

// exports.createBusiness = async (req, res) => {
//   try {
//     // Destructure and transform data from req.body
//     const {
//       name,
//       category,
//       description,

//       tags = [], // Default to empty array if not provided
//       website,
//       facebook,
//       instagram,
//       linkedin,
//       youtube,
//       tiktok,
//       x,
//       pinterest,
//       whatsapp,
//       //servicesOffered = [], // Default to empty array if not provided
//       userId,
//       locations = [], // Default to empty array if not provided
//     } = req.body;

//     console.log("req.body", req.body);

//     // Validate input
//     if (!name || !category || !userId) {
//       return res
//         .status(400)
//         .json({ message: "Name, category, and userId are required" });
//     }

//     let mainImageUrl = null;
//     if (req.file) {
//       try {
//         const result = await uploadStream(req.file.buffer);
//         mainImageUrl = result.secure_url;
//       } catch (error) {
//         throw new Error("Failed to upload image to Cloudinary");
//       }
//     }

//     console.log("mainImageUrl", req.file);
//     // Transform locations to match the schema
//     const transformedLocations = locations.map((loc) => ({
//       name: loc.name || "",
//       description: loc.description || "",
//       coordinates: [
//         parseFloat(loc.latitude) || 0, // Convert to number or default to 0
//         parseFloat(loc.longitude) || 0, // Convert to number or default to 0
//       ],
//       phone: loc.phone || "",
//       email: loc.email || "",
//       monday: loc.monday || "",
//       tuesday: loc.tuesday || "",
//       wednesday: loc.wednesday || "",
//       thursday: loc.thursday || "",
//       friday: loc.friday || "",
//       saturday: loc.saturday || "",
//       sunday: loc.sunday || "",
//       address: loc.street || "", // Assuming `address` should be `street`
//       city: loc.city || "",
//       state: loc.state || "",
//       zipCode: loc.zipCode || "",
//       country: loc.country || "",
//       season: loc.season || [], // Default to empty array if not provided
//     }));

//     // Create new business object
//     const business = new Business({
//       name,
//       category, // Assuming 'category' is the ID of a Category model
//       description,
//       image: mainImageUrl,
//       tags,
//       website: website || "",
//       socialMedia: {
//         facebook: facebook || "",
//         instagram: instagram || "",
//         linkedin: linkedin || "",
//         youtube: youtube || "",
//         tiktok: tiktok || "",
//         x: x || "",
//         pinterest: pinterest || "",
//         whatsapp: whatsapp || "",
//       },
//       servicesOffered: category || "", // Pass the services offered directly if it's already an array
//       locations: transformedLocations,
//       owner: userId, // This should match your user model or authentication
//     });

//     console.log("business", business);

//     // Save business to database
//     await business.save();
//     res.status(201).json(business);
//   } catch (error) {
//     console.error("Error creating business:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateBusiness = async (req, res) => {
//   try {
//     const { businessId } = req.params;
//     const updates = req.body;
//     const business = await Business.findByIdAndUpdate(businessId, updates, {
//       new: true,
//     });
//     if (!business) return res.status(404).json({ error: "Business not found" });
//     res.status(200).json(business);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteBusiness = async (req, res) => {
//   try {
//     const { businessId } = req.params;
//     const business = await Business.findByIdAndDelete(businessId);
//     if (!business) return res.status(404).json({ error: "Business not found" });
//     res.status(200).json({ message: "Business deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getBusinessById = async (req, res) => {
//   try {
//     const { businessId } = req.params;
//     console.log("businessId", businessId);
//     const business = await Business.findById(businessId);
//     console.log("business", business);
//     if (!business) return res.status(404).json({ error: "Business not found" });
//     res.status(200).json(business);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getBusinessesByServiceId = async (req, res) => {
//   try {
//     const { serviceId } = req.params;
//     console.log("serviceId", serviceId);

//     const businesses = await Business.find({
//       servicesOffered: { $in: [serviceId] },
//     });

//     console.log("businesses", businesses);

//     if (businesses.length === 0) {
//       return res
//         .status(404)
//         .json({ error: "No businesses found for this service ID" });
//     }

//     res.status(200).json(businesses);
//   } catch (error) {
//     console.error("Error fetching businesses by service ID:", error);
//     res.status(500).json({ error: error.message });
//   }
// };
const Business = require("../models/businessModel");
const cloudinary = require("../config/cloudinaryConfig");
const streamifier = require("streamifier");
const User = require("../models/userModel");

// Function to upload image to Cloudinary
const uploadStream = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "businesses", // Update folder name if needed
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

// Controller to create a new business
exports.createBusiness = async (req, res) => {
  try {
    const {
      name,
      description,
      businessForm,
      registrationNumber,
      isActive,
      tags = [],
      website,
      minPrice,
      maxPrice,
      socialMediaProfiles,
      category = [],
      locations = [],
      owner,
    } = req.body;

    // if (!name || !owner) {
    //   return res.status(400).json({ message: "Name and owner are required" });
    // }
    console.log("req.bodyxx", req.body);
    // Parse socialMediaProfiles if it's a JSON string
    let parsedSocialMediaProfiles = [];
    try {
      parsedSocialMediaProfiles = JSON.parse(socialMediaProfiles);
    } catch (error) {
      console.error("Error parsing socialMediaProfiles:", error);
      return res
        .status(400)
        .json({ message: "Invalid social media profiles format" });
    }
    // const transformedSocialMediaProfiles = socialMediaProfiles.map(
    //   (profile) => ({
    //     platform: profile.platform,
    //     profileUrl: profile.profileUrl,
    //     username: profile.username,
    //   })
    // );
    // console.log(
    //   "transformedSocialMediaProfiles",
    //   transformedSocialMediaProfiles
    // );
    const transformedLocations = locations.map((loc) => ({
      name: loc.name || "",
      description: loc.description || "",
      coordinates: [
        parseFloat(loc.latitude) || 0, // Convert to number or default to 0
        parseFloat(loc.longitude) || 0, // Convert to number or default to 0
      ],
      monday: loc.monday || "",
      tuesday: loc.tuesday || "",
      wednesday: loc.wednesday || "",
      thursday: loc.thursday || "",
      friday: loc.friday || "",
      saturday: loc.saturday || "",
      sunday: loc.sunday || "",
      street: loc.address || "",
      city: loc.city || "",
      state: loc.state || "",
      zipCode: loc.zipCode || "",
      country: loc.country || "",
      phone: loc.phone || "",
      email: loc.email || "",
    }));

    const existingUser = await User.findById(owner);
    console.log("existingUser", existingUser);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let imageUrl = null;
    if (req.file) {
      try {
        const result = await uploadStream(req.file.buffer);
        imageUrl = result.secure_url;
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Failed to upload image to Cloudinary", error });
      }
    }

    const business = new Business({
      name,
      description,
      businessForm,
      registrationNumber,
      isActive,
      image: imageUrl,
      tags,
      website,
      minPrice,
      maxPrice,
      socialMediaProfiles: parsedSocialMediaProfiles,
      category,
      locations: transformedLocations,
      owner: existingUser._id,
    });

    await business.save();
    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ message: "Error creating business", error });
  }
};

// Controller to update a business
exports.updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const business = await Business.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!business) return res.status(404).json({ error: "Business not found" });
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a business
exports.deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const business = await Business.findByIdAndDelete(id);
    if (!business) return res.status(404).json({ error: "Business not found" });
    res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a business by ID
exports.getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;
    const business = await Business.findById(id).populate(
      "socialMediaProfiles.platform",
      "name iconUrl"
    ); // Populate platform name and iconUrl
    if (!business) return res.status(404).json({ error: "Business not found" });
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get businesses by service ID
exports.getBusinessesByServiceId = async (req, res) => {
  try {
    const { serviceId } = req.params;
    console.log("getBusinessesByServiceId", serviceId);
    const businesses = await Business.find({ category: serviceId });
    console.log("businesses", businesses);
    if (businesses.length === 0) {
      return res
        .status(404)
        .json({ error: "No businesses found for this service ID" });
    }
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBusinesses = async (req, res) => {
  // Your implementation for getting all businesses
};

// controllers/petController.js
const Pet = require("../models/petModel");
const User = require("../models/userModel");
const { promisify } = require("util");
const streamifier = require("streamifier");
const client = require("../config/oneSignalConfig");
const OneSignal = require("onesignal-node");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const { log } = require("console");

// Promisify the upload stream
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

// Get all pets
// async function getPets(req, res) {
//   try {
//     const pets = await Pet.find();
//     res.status(200).json(pets);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

async function getPets(req, res) {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    // Filtering parameters
    const {
      categories,
      genders,
      statuses,
      sizes,
      identifier,
      date,
      colors,
      distance,
      patterns,
      userLocation,
      userCurrentLocation,
      // user,
      // recipeTitle,
    } = req.query;
    console.log("Query Parameters:", req.query);

    const filters = {};

    if (userCurrentLocation) {
      const [userLatitude, userLongitude] = userCurrentLocation
        .split(",")
        .map((coord) => parseFloat(coord));

      if (!isNaN(userLatitude) && !isNaN(userLongitude) && distance) {
        // Convert distance to radians (MongoDB requires distances in radians)
        const maxDistance = distance / 6371; // Earth's radius in kilometers (6371 km)

        filters.location = {
          $geoWithin: {
            $centerSphere: [[userLongitude, userLatitude], maxDistance],
          },
        };
      }
    }

    //console.log("userLocation", userLocation.latitude, userLocation.longitude);

    if (categories) {
      const categoryNames = categories
        .split(",")
        .map((category) => category.trim());
      console.log("categoryNames", categoryNames);
      // Find the _id values of categories based on their names
      //const categoryIds = await Taste.find({ name: { $in: tasteNames } }, "_id");
      // Extract the _id values from the fetched categories
      const categoryIdValues = categoryNames.map((category) => category);
      console.log("categoryIdValues", categoryIdValues);
      filters.category = { $in: categoryIdValues };
    }

    if (genders) {
      const genderNames = genders.split(",").map((gender) => gender.trim());
      console.log("genderNames", genderNames);
      // Find the _id values of categories based on their names
      //const categoryIds = await Taste.find({ name: { $in: tasteNames } }, "_id");
      // Extract the _id values from the fetched categories
      const genderIdValues = genderNames.map((gender) => gender);
      console.log("genderIdValues", genderIdValues);
      filters.gender = { $in: genderIdValues };
    }

    if (statuses) {
      const statusNames = statuses.split(",").map((status) => status.trim());
      console.log("statusNames", statusNames);
      // Find the _id values of categories based on their names
      //const categoryIds = await Taste.find({ name: { $in: tasteNames } }, "_id");
      // Extract the _id values from the fetched categories
      const statusIdValues = statusNames.map((status) => status);
      console.log("statusIdValues", statusIdValues);
      filters.initialStatus = { $in: statusIdValues };
    }

    if (sizes) {
      const sizeNames = sizes.split(",").map((size) => size.trim());
      console.log("sizeNames", sizeNames);
      // Find the _id values of categories based on their names
      //const categoryIds = await Taste.find({ name: { $in: tasteNames } }, "_id");
      // Extract the _id values from the fetched categories
      const sizeIdValues = sizeNames.map((size) => size);
      console.log("sizeIdValues", sizeIdValues);
      filters.size = { $in: sizeIdValues };
    }

    if (identifier) {
      filters.identifier = { $regex: new RegExp(identifier, "i") };
    }

    // if (date) {
    //   filters.date = { $gte: new Date(date) };
    // }

    if (date) {
      // Assuming `date` is in "YYYY-MM-DD" format and so are the stored dates
      filters.date = { $gte: date };
    }

    if (colors) {
      const colorNames = colors.split(",").map((color) => color.trim());
      filters.$or = [
        { mainColor: { $in: colorNames } },
        { markingColors: { $in: colorNames } },
      ];
    }

    if (patterns) {
      const patternNames = patterns.split(",").map((pattern) => pattern.trim());
      filters.markingPattern = { $in: patternNames };
    }

    // if (user.longitude && user.latitude && distance) {
    //   filterOptions.location = {
    //     $geoWithin: {
    //       $centerSphere: [[userlongitude, userlatitude], distance / 6371], // Divide maxDistance by the radius of the Earth in kilometers (6371)
    //     },
    //   };
    // }

    // Fetch recipes with pagination and filtering
    // const pets = await Pet.find(filters, "title coverImage totalTime")
    //   .skip(skip)
    //   .limit(limit);

    const pets = await Pet.find(filters).skip(skip).limit(limit);

    // Count total number of recipes for pagination
    const totalPets = await Pet.countDocuments(filters);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalPets / limit);

    // Return the result with pagination information
    res.json({
      pets,
      pagination: {
        page,
        limit,
        totalPages,
        totalPets,
      },
    });
  } catch (error) {
    console.error("Error fetching pets:", error);
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
      // mainColor,
      // markingPattern,
      // markingColors,
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

    // Handle image upload to Cloudinary
    // let mainImageUrl = null;
    // if (req.file) {
    //   const result = await cloudinary.uploader
    //     .upload_stream(
    //       {
    //         resource_type: "image",
    //         folder: "pets",
    //       },
    //       (error, result) => {
    //         if (error) {
    //           throw new Error("Failed to upload image to Cloudinary");
    //         }
    //         mainImageUrl = result.secure_url;
    //       }
    //     )
    //     .end(req.file.buffer);
    // }

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

    const clientData = req.body;
    console.log("mainImageUrl", mainImageUrl);
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
      // mainColor,
      // markingPattern,
      // markingColors,
      date,
      time,
      mainImage: mainImageUrl,
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

    // Add the pet ID to the user's ownedPets array
    existingUser.ownedPets.push(savedPet._id);
    await existingUser.save();

    // from chatgpt
    // Sending push notification
    // const notification = {
    //   contents: {
    //     en: "A new pet has been added!",
    //   },
    //   included_segments: ["All"], // You can adjust this to target specific segments or users
    //   data: {
    //     petId: savedPet._id,
    //     title: savedPet.identifier, // Example data payload
    //   },
    // };

    // Define the geographical center and radius for targeting
    const centerLatitude = lat; // Latitude of the pet's last known location
    console.log("centerLatitude", centerLatitude);
    const centerLongitude = lng; // Longitude of the pet's last known location
    console.log("centerLongitude", centerLongitude);
    const radiusInKilometers = 10; // Example radius in km

    const latitudeThreshold = radiusInKilometers / 110.574; // 1 degree of latitude is approximately 110.574 km
    console.log("latitudeThreshold", latitudeThreshold);
    const longitudeThreshold =
      radiusInKilometers /
      (111.32 * Math.cos((centerLatitude * Math.PI) / 180)); // 1 degree of longitude varies based on latitude
    console.log("longitudeThreshold", longitudeThreshold);
    const filters = [
      {
        field: "tag",
        key: "latitude",
        relation: ">",
        value: centerLatitude - latitudeThreshold,
      },
      { operator: "AND" },
      {
        field: "tag",
        key: "latitude",
        relation: "<",
        value: centerLatitude + latitudeThreshold,
      },
      { operator: "AND" },
      {
        field: "tag",
        key: "longitude",
        relation: ">",
        value: centerLongitude - longitudeThreshold,
      },
      { operator: "AND" },
      {
        field: "tag",
        key: "longitude",
        relation: "<",
        value: centerLongitude + longitudeThreshold,
      },
    ];

    // old code
    const client = new OneSignal.Client(
      process.env.oneSignal_YOUR_APP_ID,
      process.env.oneSignal_YOUR_APP_AUTH_KEY
    );

    const notification = {
      contents: { en: `URGENT! Lost pet alert!` },
      filters: filters,
      included_segments: ["All"],
      web_url: `https://pawclix.com/pets/${pet._id}`,
    };

    client
      .createNotification(notification)
      .then((response) => {
        console.log("Notification sent successfully:", response.body);
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
      });

    res.status(201).json(savedPet);
  } catch (error) {
    console.error("Error creating pet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing pet
// async function updatePet(req, res) {
//   const { id } = req.params;
//   const { name } = req.body;

//   try {
//     const updatedPet = await Pet.findByIdAndUpdate(id, { name }, { new: true });
//     res.status(200).json(updatedPet);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

const updatePet = async (req, res) => {
  try {
    const petId = req.params.id;
    const updates = req.body;
    console.log("petId", petId);
    console.log("updates", updates);

    const pet = await Pet.findByIdAndUpdate(petId, updates, { new: true });

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json(pet);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { updatePet };

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

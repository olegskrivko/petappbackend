// controllers/petController.js
const Pet = require("../models/petModel");
const User = require("../models/userModel");
const { promisify } = require("util");
const streamifier = require("streamifier");

const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");

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
      // user,
      // recipeTitle,
      // // recipeAuthor,
      // totalTime,
      // // hasReviews,
      // difficulties,
      // minimumScore,
      // cookingMethods,
      // meals,
      // diets,
      // categories,
      // cuisines,
      // // occasions,
      // includedIngredients,
      // excludedIngredients,
    } = req.query;
    console.log("Query Parameters:", req.query);

    const filters = {};

    // Add filters based on query parameters
    // if (recipeTitle) {
    //   console.log("recipeTitle", recipeTitle);
    //   filters.title = { $regex: new RegExp(recipeTitle, "i") };
    // }

    // Add filter for recipes with reviews
    // if (hasReviews === "true") {
    //   filters.reviews = { $exists: true, $ne: [] }; // Filter recipes with non-empty reviews array
    // }

    // Add filter for difficulty
    // if (difficulties) {
    //   // 10 signifies that the numbers should be parsed as base-10 (decimal) integers
    //   // Convert the difficulty string to an array of integers
    //   const difficultyLevels = difficulties
    //     .split(",")
    //     .map((level) => parseInt(level.trim(), 10));

    //   // Add the difficulty filter to the query
    //   filters.difficulty = { $in: difficultyLevels };
    // }

    // Add filter for meals
    // if (meals) {
    //   const mealNames = meals.split(",").map((meal) => meal.trim());
    //   // Find the _id values of meals based on their names
    //   const mealIds = await Meal.find({ name: { $in: mealNames } }, "_id");
    //   // Extract the _id values from the fetched meals
    //   const mealIdValues = mealIds.map((meal) => meal._id);
    //   filters.meals = { $in: mealIdValues };
    // }

    // Add filter for diets
    // if (diets) {
    //   const dietNames = diets.split(",").map((diet) => diet.trim());
    //   // Find the _id values of diets based on their names
    //   const dietIds = await Diet.find({ name: { $in: dietNames } }, "_id");
    //   // Extract the _id values from the fetched diets
    //   const dietIdValues = dietIds.map((diet) => diet._id);
    //   filters.diets = { $in: dietIdValues };
    // }

    // Add filter for cuisines
    // if (cuisines) {
    //   const cuisineNames = cuisines.split(",").map((cuisine) => cuisine.trim());
    //   // Find the _id values of cuisines based on their names
    //   const cuisineIds = await Cuisine.find(
    //     { name: { $in: cuisineNames } },
    //     "_id"
    //   );
    //   // Extract the _id values from the fetched cuisines
    //   const cuisineIdValues = cuisineIds.map((cuisine) => cuisine._id);
    //   filters.cuisines = { $in: cuisineIdValues };
    // }

    // Add filter for tastes
    // if (tastes) {
    //   const tasteNames = tastes.split(",").map((taste) => taste.trim());
    //   // Find the _id values of tastes based on their names
    //   const tasteIds = await Taste.find({ name: { $in: tasteNames } }, "_id");
    //   // Extract the _id values from the fetched tastes
    //   const tasteIdValues = tasteIds.map((taste) => taste._id);
    //   filters.tastes = { $in: tasteIdValues };
    // }

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

    // Add filter for cooking methods
    // if (cookingMethods) {
    //   const cookingMethodNames = cookingMethods
    //     .split(",")
    //     .map((cookingMethod) => cookingMethod.trim());
    //   // Find the _id values of cooking methods based on their names
    //   const cookingMethodIds = await CookingMethod.find(
    //     { name: { $in: cookingMethodNames } },
    //     "_id"
    //   );
    //   // Extract the _id values from the fetched cooking methods
    //   const cookingMethodIdValues = cookingMethodIds.map(
    //     (cookingMethod) => cookingMethod._id
    //   );
    //   filters.cookingMethods = { $in: cookingMethodIdValues };
    // }

    // Add filter for total time
    // if (totalTime) {
    //   // Split the totalTime string into an array containing min and max times
    //   const [minTime, maxTime] = totalTime.split(",");

    //   // Convert the min and max times to numbers
    //   const minTimeNum = parseInt(minTime);
    //   const maxTimeNum = maxTime === "Infinity" ? Infinity : parseInt(maxTime);

    //   // Add the totalTime filter to the query
    //   filters.totalTime = { $gte: minTimeNum, $lte: maxTimeNum };
    // }

    // Add filter for included ingredients

    // Inside the async function getAllRecipes
    // Add filter for included ingredients
    // if (includedIngredients) {
    //   const includedIngredientIds = includedIngredients
    //     .split(",")
    //     .map((ingredientId) => ingredientId.trim());

    //   // Add the filter for included ingredients
    //   filters["ingredients.items.ingredient"] = { $in: includedIngredientIds };
    // }

    // // Add filter for excluded ingredients
    // if (excludedIngredients) {
    //   const excludedIngredientIds = excludedIngredients
    //     .split(",")
    //     .map((ingredientId) => ingredientId.trim());

    //   // Add the filter for excluded ingredients
    //   filters["ingredients.items.ingredient"] = { $nin: excludedIngredientIds };
    // }

    // Add filter for included ingredients
    // if (includedIngredients) {
    //   const includedIngredientIds = includedIngredients
    //     .split(",")
    //     .map((ingredientId) => ingredientId.trim());

    //   // Add the filter for included ingredients
    //   filters["ingredients.items.ingredient"] = { $all: includedIngredientIds };
    // }

    // Add filter for excluded ingredients
    // if (excludedIngredients) {
    //   const excludedIngredientIds = excludedIngredients
    //     .split(",")
    //     .map((ingredientId) => ingredientId.trim());

    //   // Add the filter for excluded ingredients
    //   filters["ingredients.items.ingredient"] = { $nin: excludedIngredientIds };
    // }

    // You can add more filters based on your needs

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

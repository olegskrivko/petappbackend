// const Article = require("../models/articleModel");

// // Get all articles
// const getAllArticles = async (req, res) => {
//   try {
//     const articles = await Article.find();
//     res.status(200).json(articles);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create a new article
// const createArticle = async (req, res) => {
//   const { title, content, author, source, sections } = req.body;

//   const newArticle = new Article({
//     title,
//     content,
//     author,
//     source,
//     sections,
//   });

//   try {
//     const savedArticle = await newArticle.save();
//     res.status(201).json(savedArticle);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get article by id
// const getArticleById = async (req, res) => {
//   const { slug } = req.params;
//   try {
//     const article = await Article.findOne({ _id: slug }); // or { slug } if slug field exists
//     if (!article) {
//       return res.status(404).json({ message: "Article not found" });
//     }
//     res.status(200).json(article);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update an existing article
// const updateArticle = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const updatedArticle = await Article.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     if (!updatedArticle) {
//       return res.status(404).json({ message: "Article not found" });
//     }
//     res.status(200).json(updatedArticle);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete an article
// const deleteArticle = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedArticle = await Article.findByIdAndDelete(id);
//     if (!deletedArticle) {
//       return res.status(404).json({ message: "Article not found" });
//     }
//     res.status(200).json({ message: "Article deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   getAllArticles,
//   createArticle,
//   getArticleById,
//   updateArticle,
//   deleteArticle,
// };

const Article = require("../models/articleModel");
const cloudinary = require("../config/cloudinaryConfig");
const User = require("../models/userModel");
const streamifier = require("streamifier");
const { Readable } = require("stream");
// const slugify = require("slugify");

// Promisify the upload stream
const uploadStream = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "articles",
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

// Get all articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new article
// const createArticle = async (req, res) => {
//   const {
//     author,
//     mainTitle,
//     description,
//     source,
//     coverPicture,
//     notes,
//     sections,
//   } = req.body;

//   try {
//     const newArticle = new Article({
//       author,
//       mainTitle,
//       description,
//       source,
//       coverPicture,
//       notes,
//       sections,
//     });

//     const savedArticle = await newArticle.save();
//     res.status(201).json(savedArticle);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Create a new article with multiple images
// const createArticle = async (req, res) => {
//   try {
//     const { author, mainTitle, description, source, notes, sections } =
//       req.body;

//     // Handle image uploads
//     const imageFiles = req.files; // Array of uploaded files
//     const imageUrls = [];
//     console.log("imageFiles", imageFiles);
//     if (imageFiles && imageFiles.length > 0) {
//       try {
//         for (const file of imageFiles) {
//           const result = await uploadStream(file.buffer);
//           imageUrls.push(result.secure_url);
//         }
//       } catch (error) {
//         return res
//           .status(500)
//           .json({
//             message: "Failed to upload images to Cloudinary",
//             error: error.message,
//           });
//       }
//     }

//     // Create new article
//     const newArticle = new Article({
//       author,
//       mainTitle,
//       description,
//       source,
//       coverPicture: imageUrls[0] || null, // Use the first image as the cover picture if available
//       notes,
//       sections,
//       images: imageUrls, // Store all image URLs
//     });

//     const savedArticle = await newArticle.save();
//     res.status(201).json(savedArticle);
//   } catch (error) {
//     console.error("Error creating article:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// Create a new article with multiple images
// Create a new article with multiple images
// const createArticle = async (req, res) => {
//   try {
//     console.log("Request Body:", req.body);
//     console.log("Request Files:", req.files);

//     // Extract and parse JSON fields
//     const { author, mainTitle, description, source, notes, sections } =
//       req.body;

//     // Ensure sections is parsed correctly
//     let sectionsArray = [];
//     try {
//       sectionsArray = Array.isArray(sections) ? sections : JSON.parse(sections);
//     } catch (error) {
//       return res.status(400).json({ message: "Invalid sections format" });
//     }

//     // Handle image uploads
//     const sectionImageFiles = req.files["sectionImages"]; // Adjust according to your actual field name
//     const sectionImages = [];

//     if (sectionImageFiles && sectionImageFiles.length > 0) {
//       try {
//         for (const file of sectionImageFiles) {
//           if (file.buffer) {
//             // Upload the image and get the URL
//             const result = await uploadStream(file.buffer);
//             sectionImages.push(result.secure_url);
//           }
//         }
//       } catch (error) {
//         return res.status(500).json({
//           message: "Failed to upload images",
//           error: error.message,
//         });
//       }
//     }

//     // Map uploaded images to sections
//     const updatedSections = sectionsArray.map((section, index) => ({
//       ...section,
//       picture: sectionImages[index] || section.picture, // Update section picture if an image was uploaded
//     }));

//     // Create new article
//     const newArticle = new Article({
//       author,
//       mainTitle,
//       description,
//       source,
//       notes,
//       sections: updatedSections,
//     });

//     const savedArticle = await newArticle.save();
//     res.status(201).json(savedArticle);
//   } catch (error) {
//     console.error("Error creating article:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const createArticle = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    // Extract text fields
    const { author, mainTitle, description, source, notes } = req.body;

    // Parse sections array from req.body
    const sectionsArray = [];
    for (let key in req.body) {
      if (key.startsWith("sections[")) {
        const index = key.match(/\d+/)[0]; // Extract the index
        const field = key.split(".")[1]; // Get the field name (number, title, content)
        const sectionIndex = parseInt(index, 10);

        if (!sectionsArray[sectionIndex]) {
          sectionsArray[sectionIndex] = { number: "", title: {}, content: {} };
        }

        if (field === "number") {
          sectionsArray[sectionIndex].number = req.body[key];
        } else if (field === "title") {
          sectionsArray[sectionIndex].title = JSON.parse(req.body[key]);
        } else if (field === "content") {
          sectionsArray[sectionIndex].content = JSON.parse(req.body[key]);
        }
      }
    }

    // Handle image uploads
    const sectionImageFiles = req.files.filter((file) =>
      file.fieldname.startsWith("sectionImages")
    );
    const sectionImages = [];

    if (sectionImageFiles.length > 0) {
      try {
        for (const file of sectionImageFiles) {
          if (file.buffer) {
            // Replace with your actual file upload logic
            const result = await uploadStream(file.buffer);
            sectionImages.push(result.secure_url);
          }
        }
      } catch (error) {
        return res.status(500).json({
          message: "Failed to upload images",
          error: error.message,
        });
      }
    }

    // Map uploaded images to sections
    const updatedSections = sectionsArray.map((section, index) => ({
      ...section,
      picture: sectionImages[index] || section.picture, // Use uploaded image or existing picture
    }));

    // Create new article
    const newArticle = new Article({
      author,
      mainTitle: JSON.parse(mainTitle),
      description: JSON.parse(description),
      source,
      notes: JSON.parse(notes),
      sections: updatedSections,
    });

    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const createArticle = async (req, res) => {
//   try {
//     console.log("Request Body:", req.body);
//     console.log("Request Files:", req.files);

//     const { author, mainTitle, description, source, notes, sections } =
//       req.body;

//     // Parse JSON fields
//     const parsedMainTitle = JSON.parse(mainTitle);
//     const parsedDescription = JSON.parse(description);
//     const parsedNotes = JSON.parse(notes);
//     const parsedSections = JSON.parse(sections);

//     // Handle image uploads for sections
//     const sectionImageFiles = req.files["sectionImages"]; // Array of uploaded files
//     const sectionImages = [];

//     if (sectionImageFiles && sectionImageFiles.length > 0) {
//       try {
//         for (const file of sectionImageFiles) {
//           const result = await uploadStream(file.buffer);
//           sectionImages.push(result.secure_url);
//         }
//       } catch (error) {
//         return res.status(500).json({
//           message: "Failed to upload images to Cloudinary",
//           error: error.message,
//         });
//       }
//     }

//     // Map uploaded images to sections
//     const updatedSections = parsedSections.map((section, index) => ({
//       ...section,
//       picture: sectionImages[index] || section.picture, // Update section picture if an image was uploaded
//     }));

//     // Create new article
//     const newArticle = new Article({
//       author,
//       mainTitle: parsedMainTitle,
//       description: parsedDescription,
//       source,

//       notes: parsedNotes,
//       sections: updatedSections,
//     });

//     const savedArticle = await newArticle.save();
//     res.status(201).json(savedArticle);
//   } catch (error) {
//     console.error("Error creating article:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Get article by id
const getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get article by id
// const getArticleById = async (req, res) => {
//   const { slug } = req.params;
//   try {
//     const article = await Article.findOne({ _id: slug }); // or { slug } if slug field exists
//     if (!article) {
//       return res.status(404).json({ message: "Article not found" });
//     }
//     res.status(200).json(article);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getArticleBySlug = async (req, res) => {
//   const { slug } = req.params;
//   console.log(slug, "slug");
//   try {
//     const article = await Article.findOne({ slug: slug }); // or { slug } if slug field exists
//     if (!article) {
//       return res.status(404).json({ message: "Article not found" });
//     }
//     res.status(200).json(article);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Update an existing article
const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, author, source, sections } = req.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title, content, author, source, sections },
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an article
const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllArticles,
  createArticle,
  //   getArticleById,
  getArticleById,
  updateArticle,
  deleteArticle,
};

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
const slugify = require("slugify");
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
const createArticle = async (req, res) => {
  const { title, content, author, source, coverPicture, sections } = req.body;
  const slug = slugify(title, { lower: true, strict: true });
  const newArticle = new Article({
    title,
    content,
    author,
    source,
    coverPicture, // Added coverPicture field
    sections,
    slug,
  });

  try {
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get article by id
// const getArticleById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const article = await Article.findById(id);
//     if (!article) {
//       return res.status(404).json({ message: "Article not found" });
//     }
//     res.status(200).json(article);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
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

const getArticleBySlug = async (req, res) => {
  const { slug } = req.params;
  console.log(slug, "slug");
  try {
    const article = await Article.findOne({ slug: slug }); // or { slug } if slug field exists
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
  getArticleBySlug,
  updateArticle,
  deleteArticle,
};

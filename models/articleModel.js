// // const mongoose = require("mongoose");

// // const sectionSchema = new mongoose.Schema({
// //   picture: {
// //     type: String,
// //     required: true,
// //   },
// //   title: {
// //     type: String,
// //     required: true,
// //   },
// //   number: {
// //     type: Number,
// //     required: true,
// //   },
// //   text: {
// //     type: String,
// //     required: true,
// //   },
// // });

// // const articleSchema = new mongoose.Schema({
// //   title: {
// //     type: String,
// //     required: true,
// //   },
// //   content: {
// //     type: String,
// //     required: true,
// //   },
// //   author: {
// //     type: String,
// //     // required: true,
// //   },
// //   source: {
// //     type: String,
// //     // required: true
// //   },
// //   sections: [sectionSchema],
// //   createdAt: {
// //     type: Date,
// //     default: Date.now,
// //   },
// // });

// // const Article = mongoose.model("Article", articleSchema);

// // module.exports = Article;
// // const mongoose = require("mongoose");
// // const sectionSchema = new mongoose.Schema({
// //   picture: {
// //     type: String,
// //     required: true,
// //   },
// //   title: {
// //     type: String,
// //     required: true,
// //   },
// //   number: {
// //     type: Number,
// //     required: true,
// //   },
// //   paragraphs: {
// //     type: [String],
// //     required: true,
// //   },
// // });

// // const articleSchema = new mongoose.Schema({
// //   title: {
// //     type: String,
// //     required: true,
// //   },
// //   content: {
// //     type: String,
// //     required: true,
// //   },
// //   author: {
// //     type: String,
// //   },
// //   source: {
// //     type: String,
// //   },
// //   slug: {
// //     // Added slug field
// //     type: String,
// //     required: true,
// //     unique: true,
// //   },
// //   coverPicture: {
// //     // Added coverPicture field
// //     type: String,
// //     required: true,
// //   },
// //   sections: [sectionSchema],
// //   createdAt: {
// //     type: Date,
// //     default: Date.now,
// //   },
// // });

// // const Article = mongoose.model("Article", articleSchema);

// // module.exports = Article;

// const mongoose = require("mongoose");

// const sectionSchema = new mongoose.Schema({
//   picture: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   number: {
//     type: Number,
//     required: true,
//   },
//   paragraphs: {
//     type: [String],
//     required: true,
//   },
// });

// const localizedSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   sections: [sectionSchema],
// });

// const articleSchema = new mongoose.Schema({
//   author: {
//     type: String,
//   },
//   source: {
//     type: String,
//   },
//   coverPicture: {
//     type: String,
//     required: true,
//   },
//   languages: {
//     en: {
//       type: localizedSchema,
//       required: true,
//     },
//     ru: {
//       type: localizedSchema,
//       required: true,
//     },
//     lv: {
//       type: localizedSchema,
//       required: true,
//     },
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Article = mongoose.model("Article", articleSchema);

// module.exports = Article;

const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  author: String,
  mainTitle: {
    en: String,
    ru: String,
    lv: String,
  },
  description: {
    en: String,
    ru: String,
    lv: String,
  },
  source: String,
  coverPicture: String,
  notes: {
    en: [String], // Array of notes for English
    ru: [String], // Array of notes for Russian
    lv: [String], // Array of notes for Latvian
  },
  sections: [
    {
      picture: String,
      title: {
        en: String,
        ru: String,
        lv: String,
      },
      number: Number,
      content: {
        en: String,
        ru: String,
        lv: String,
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;

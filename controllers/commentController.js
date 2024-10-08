// commentController.js
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Pet = require("../models/petModel");
const cloudinary = require("../config/cloudinaryConfig");
const streamifier = require("streamifier");

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

// Function to resize and compress image using sharp
// const processImage = async (buffer) => {
//   return sharp(buffer)
//     .resize({ width: 800, height: 800, fit: 'inside' }) // Resize while maintaining aspect ratio
//     .jpeg({ quality: 80 }) // Compress to 80% quality
//     .toBuffer();
// };

exports.createComment = async (req, res) => {
  try {
    const { message, author, location, petId } = req.body;
    let image = null;

    // Check if file is uploaded
    if (req.file) {
      // Upload image to Cloudinary using stream
      const result = await uploadStream(req.file.buffer);
      image = result.secure_url;
    }

    // if (req.file) {
    //   // Process the image
    //   const processedImageBuffer = await processImage(req.file.buffer);

    //   // Upload processed image to Cloudinary
    //   const result = await uploadStream(processedImageBuffer);
    //   image = result.secure_url;
    // }

    console.log("Request body:", req.body);
    console.log("Message:", message);
    console.log("Pet ID:", petId);
    console.log("location", location);
    console.log("image", image);
    // Verify that the userId exists in the database
    const existingUser = await User.findById(author);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify that the petId exists in the database
    const existingPet = await Pet.findById(petId);
    if (!existingPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Adjust to match the model
    // const receivedLocation = {
    //   type: "Point",
    //   coordinates: [location.lat, location.lng],
    // };

    // Prepare the location if it's provided
    let receivedLocation = null;
    if (location) {
      receivedLocation = {
        type: "Point",
        coordinates: [location.lat, location.lng],
      };
    }

    const comment = await Comment.create({
      text: message,
      petId: existingPet._id,
      image,
      avatar: existingUser.avatar,
      author: existingUser._id,
      location: receivedLocation,
    });

    // Push the comment to the pet's comments array
    existingPet.comments.push(comment._id);

    // Add the location to the pet's location history
    existingPet.locationHistory.push({
      date: new Date(),
      location: receivedLocation,
      userId: existingUser._id,
      commentId: comment._id,
    });
    await existingPet.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  const { id: petId } = req.params;

  try {
    const comments = await Comment.find({ petId }).populate("author");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentById = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  const { text } = req.body;
  const { commentId } = req.params;

  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  console.log("Delete comment");
  const { commentId } = req.params;
  console.log("Comment ID:", commentId);

  try {
    // Find the comment by ID
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    console.log("Comment:", comment);

    // Pull the comment ID from the pet's comments array
    const updateResult = await Pet.updateOne(
      { _id: comment.petId },
      { $pull: { comments: commentId } }
    );

    if (updateResult.nModified === 0) {
      return res
        .status(404)
        .json({ error: "Comment not found in pet's comments" });
    }

    // Delete the location history associated with the comment from the pet
    await Pet.updateOne(
      { _id: comment.petId },
      { $pull: { locationHistory: { commentId: commentId } } }
    );

    // Find the pet after deletion
    const updatedPet = await Pet.findById(comment.petId);
    console.log("Pet after deletion:", updatedPet);

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    res
      .status(200)
      .json({ message: "Comment and associated location deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: error.message });
  }
};

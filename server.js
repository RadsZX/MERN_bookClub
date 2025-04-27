const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = "YOUR_MONGO_URI";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ------------------------
// Schemas and Models
// ------------------------

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  isbn: String,
});
const Book = mongoose.model("Book", bookSchema);

const userSchema = new mongoose.Schema({
  userid:String,
  username: String,
  profilePic: String,
  bookshelves: {
    read: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    currentlyReading: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    toRead: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  },
});
const User = mongoose.model("User", userSchema);

// Replies for Discussions
const replySchema = new mongoose.Schema({
  username: { type: String, default: 'Anonymous' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Discussion Schema
const discussionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: String, default: 'Anonymous' },
  createdAt: { type: Date, default: Date.now },
  replies: [replySchema],
});
const Discussion = mongoose.model("Discussion", discussionSchema);

// ------------------------
// Routes
// ------------------------

// Book Routes
app.post("/api/library", async (req, res) => {
  try {
    const { title, imageUrl, isbn } = req.body;
    const existing = await Book.findOne({ isbn });

    if (existing) {
      return res.status(409).json({ message: "Book already exists in library." });
    }

    const book = new Book({ title, imageUrl, isbn });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/library", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Discussion Routes
app.post("/api/discussions", async (req, res) => {
  const { title, content, user } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const newDiscussion = new Discussion({ title, content, user });
    const savedDiscussion = await newDiscussion.save();
    res.status(201).json(savedDiscussion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/discussions", async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/discussions/:id/replies", async (req, res) => {
  try {
    const { username, content } = req.body;
    const { id } = req.params;

    const discussion = await Discussion.findById(id);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    discussion.replies.push({ username, content });
    await discussion.save();

    res.status(201).json(discussion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------------
// Profile Picture Upload
// ------------------------

// Static folder for profile image serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// File Upload Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });


app.post("/api/users/:id/profile-pic", upload.single("profilePic"), async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = `uploads/${req.file.filename}`;

    let user = await User.findOne({"userid":id});
    if (!user) {
      user = new User({userid:id, username: id, profilePic: filePath });
    } else {
      user.profilePic = filePath;
    }
    await user.save();

    res.status(201).json({ message: "Upload successful", filePath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ userid: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/users/:userId/username", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { userid: req.params.userId }, // Find the user by ID
      { username: req.body.username }, // Set the new username
      { new: true } // Return the updated user document
    );
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    res.json(user); // Return the updated user info
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Fetch bookshelves
app.get("/api/users/:id/bookshelves", async (req, res) => {
  const user = await User.findOne({ userid: req.params.id })
    .populate("bookshelves.read")
    .populate("bookshelves.currentlyReading")
    .populate("bookshelves.toRead");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user.bookshelves);
});

// Move book between shelves
app.patch("/api/users/:id/move-book", async (req, res) => {
  const { bookId, fromShelf, toShelf } = req.body;
  const user = await User.findOne({ userid: req.params.id });
  if (!user) return res.status(404).json({ message: "User not found" });

  user.bookshelves[fromShelf] = user.bookshelves[fromShelf].filter(id => id.toString() !== bookId);
  user.bookshelves[toShelf].push(bookId);
  await user.save();
  res.json({ message: "Book moved successfully" });
});

// Add book to shelf
app.post("/api/users/:id/add-book", async (req, res) => {
  const { bookId, shelf } = req.body;
  const user = await User.findOne({ userid: req.params.id });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.bookshelves[shelf].includes(bookId))
    return res.status(400).json({ message: "Already in this shelf" });

  user.bookshelves[shelf].push(bookId);
  await user.save();
  res.json({ message: "Book added to shelf successfully" });
});
// ------------------------
// Start Server
// ------------------------
// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your actual MongoDB connection string
const mongoURI = "mongodb+srv://radhikaap583:book-club25@bookclub.fbhhlwn.mongodb.net/?retryWrites=true&w=majority&appName=BookClub";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  isbn: String,
});
const Book = mongoose.model("Book", bookSchema);

// Define a schema for replies
const replySchema = new mongoose.Schema({
  username: {
    type: String,
    default: 'Anonymous',
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the discussion schema
const discussionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    default: 'Anonymous',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [replySchema], // ✅ Add replies as an array of replySchema
});

const Discussion = mongoose.model("Discussion", discussionSchema);

// POST - Add book to library
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

// GET - Fetch all books
app.get("/api/library", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// POST - Add new discussion
app.post("/api/discussions", async (req, res) => {
  const { title, content, user } = req.body;
  console.log("Incoming discussion:", req.body);

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

// GET - Fetch all discussions
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

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

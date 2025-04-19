const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your actual connection string
const mongoURI = "mongodb+srv://radhikaap583:book-club25@bookclub.fbhhlwn.mongodb.net/?retryWrites=true&w=majority&appName=BookClub";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const bookSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  isbn: String,
});

const Book = mongoose.model("Book", bookSchema);

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

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

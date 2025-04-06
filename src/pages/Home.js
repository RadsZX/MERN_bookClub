import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const bookClubs = [
    { name: "Fiction Lovers", description: "For fans of storytelling." },
    { name: "Science Fiction Enthusiasts", description: "Explore futuristic worlds." },
    { name: "Non-Fiction Buffs", description: "For those who love real-life stories." },
    { name: "Fantasy Addicts", description: "Dive into magical worlds." },
    { name: "Mystery and Thrillers", description: "If you enjoy suspenseful books." },
    { name: "History Buffs", description: "For those who love history and learning about the past." },
  ];

  const books = [
    {
      title: "The Silent Patient",
      imageUrl: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg"
    },
    {
      title: "These Violent Delights",
      imageUrl: "https://covers.openlibrary.org/b/isbn/9781534457720-L.jpg"
    },
    {
      title: "Normal People",
      imageUrl: "https://covers.openlibrary.org/b/isbn/9780571334650-L.jpg"
    },
    {
      title: "The Vanishing Half",
      imageUrl: "https://covers.openlibrary.org/b/isbn/9780525536291-L.jpg"
    },
    {
      title: "Black Sun",
      imageUrl: "https://covers.openlibrary.org/b/isbn/9781534437678-L.jpg"
    },
    {
      title: "My Year of Rest and Relaxation",
      imageUrl: "https://covers.openlibrary.org/b/isbn/9780525522119-L.jpg"
    },
    {
      title: "Blood of Hercules",
      imageUrl: "https://covers.openlibrary.org/b/isbn/9781335474735-L.jpg"
    }
  ];
   
  <img
  src={books.imageUrl}
  alt={books.title}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/150x220?text=No+Cover";
  }}
/>
  
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredClubs = bookClubs.filter((club) =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <h2>Welcome to the Online Book Club</h2>
      <p>Join a club, participate in discussions, track your reading progress, and connect with fellow book lovers!</p>

      <div className="featured-books">
        <h3>Featured Books</h3>
        <div className="book-list">
          {books.map((book, index) => (
            <div key={index} className="book-item">
              <img src={book.imageUrl} alt={book.title} className="book-cover" />
              <p>{book.title}</p>
            </div>
          ))}
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Book Clubs"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />

      <div className="book-club-grid">
        {filteredClubs.length > 0 ? (
          filteredClubs.map((club, index) => (
            <div key={index} className="club-card">
              <h3>{club.name}</h3>
              <p>{club.description}</p>
            </div>
          ))
        ) : (
          <p>No book clubs found based on your search.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

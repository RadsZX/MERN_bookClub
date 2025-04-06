import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Clubs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const bookClubs = [
    { name: "Fiction Lovers", description: "For fans of storytelling." },
    { name: "Science Fiction Enthusiasts", description: "Explore futuristic worlds." },
    { name: "Non-Fiction Buffs", description: "For those who love real-life stories." },
    { name: "Fantasy Addicts", description: "Dive into magical worlds." },
    { name: "Mystery and Thrillers", description: "If you enjoy suspenseful books." },
    { name: "History Buffs", description: "For those who love history and learning about the past." },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredClubs = bookClubs.filter((club) =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const slugify = (name) => name.toLowerCase().replace(/\s+/g, "-");

  const handleClubClick = (clubName) => {
    const slug = slugify(clubName);
    navigate(`/clubs/${slug}`);
  };

  return (
    <div className="clubs-container">
      <h2>Explore Book Clubs</h2>
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
            <div
              key={index}
              className="club-card"
              onClick={() => handleClubClick(club.name)}
              style={{ cursor: "pointer" }}
            >
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

export default Clubs;

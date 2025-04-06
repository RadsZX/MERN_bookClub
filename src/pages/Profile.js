import React, { useRef, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div
            className="profile-pic"
            onClick={() => fileInputRef.current.click()}
          >
            {image ? (
              <img src={image} alt="Profile" className="uploaded-pic" />
            ) : (
              <span className="plus">+</span>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <div>
            <h1 className="username">Ceremen</h1>
            <p className="joined">Joined in April 2025</p>
          </div>
        </div>

        {/* Bookshelves */}
        <div className="section">
          <h2>Ceremen's Bookshelves</h2>
          <div className="bookshelves">
            <div className="shelf">
              <h3>Read (1)</h3>
              <img
                src="https://covers.openlibrary.org/b/id/10563858-L.jpg"
                alt="The Silent Patient"
                className="book-cover"
              />
              <p>The Silent Patient</p>
            </div>

            <div className="shelf">
              <h3>Currently Reading (0)</h3>
              <img
                src="https://via.placeholder.com/150x220?text=No+Book"
                alt="No book"
                className="book-cover"
              />
              <p>No books currently</p>
            </div>

            <div className="shelf">
              <h3>To-Read (1)</h3>
              <img
                src="https://covers.openlibrary.org/b/id/9873294-L.jpg"
                alt="Atomic Habits"
                className="book-cover"
              />
              <p>Atomic Habits</p>
            </div>
          </div>
        </div>

        {/* Quotes */}
        <div className="section">
          <h2>Ceremen's Quotes</h2>
          <p className="info">
            Ceremen hasn't added any quotes yet.{" "}
            <span className="link">Add quotes now »</span>
          </p>
        </div>

        {/* Friends */}
        <div className="section">
          <h2>Ceremen's Friends</h2>
          <p className="link">Invite your friends »</p>
        </div>

        {/* Year in Books */}
        <div className="year-in-books">
          <h2>Your 2024 Year in Books</h2>
          <p>
            Enjoy a look back at the books you read this year, including some fun
            facts about your reading.
          </p>
          <p className="link">Go to Your 2024 Year in Books »</p>
        </div>
      </div>
    </>
  );
};

export default Profile;

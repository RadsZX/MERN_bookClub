import React from "react";
import "./Home.css";

const books = [
  {
    title: "The Silent Patient",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg",
  },
  {
    title: "These Violent Delights",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781534457720-L.jpg",
  },
  {
    title: "Normal People",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780571334650-L.jpg",
  },
  {
    title: "The Vanishing Half",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780525536291-L.jpg",
  },
  {
    title: "Black Sun",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781534437678-L.jpg",
  },
  {
    title: "My Year of Rest and Relaxation",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780525522119-L.jpg",
  },
  {
    title: "Blood of Hercules",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781335474735-L.jpg",
  },
  {
    title: "Terror in the Attic",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780749746705-L.jpg",
  },
  {
    title: "Matilda",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780140328721-L.jpg",
  },
  {
    title: "The Midnight Library",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg",
  },
  {
    title: "It Ends with Us",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg",
  },
  {
    title: "Where the Crawdads Sing",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780735219106-L.jpg",
  },
  {
    title: "Verity",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781538724736-L.jpg",
  },
  {
    title: "The Alchemist",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
  },
  {
    title: "Educated",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg",
  },
  {
    title: "The Book Thief",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780375842207-L.jpg",
  },
  {
    title: "Circe",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780316556347-L.jpg",
  },
  {
    title: "Little Women",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780147514011-L.jpg",
  },
  {
    title: "The Seven Husbands of Evelyn Hugo",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781501161933-L.jpg",
  },
  {
    title: "A Man Called Ove",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781476738024-L.jpg",
  },
  {
    title: "The Great Gatsby",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
  },
  {
    title: "Pride and Prejudice",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780141439519-L.jpg",
  },
  {
    title: "1984",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
  },
  {
    title: "The Hobbit",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780345339683-L.jpg",
  },
  {
    title: "The Catcher in the Rye",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg",
  },
  {
    title: "To Kill a Mockingbird",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
  },
  {
    title: "The Fault in Our Stars",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780525478812-L.jpg",
  }
];

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to the Bookish!</h2>
      <p>
        Join a club, participate in discussions, track your reading progress, and
        connect with fellow book lovers!
      </p>

      <div className="featured-books">
        <h3>Featured Books</h3>
        <div className="book-list">
          {books.map((book, index) => (
            <div key={index} className="book-item">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="book-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/150x220?text=No+Cover";
                }}
              />
              <p>{book.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

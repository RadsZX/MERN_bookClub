import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ClubDetail.css";

const clubData = {
  "fiction-lovers": {
    name: "Fiction Lovers",
    description: "For fans of storytelling and immersive plots.",
    banner: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    logo: "https://cdn-icons-png.flaticon.com/512/29/29302.png"
  },
  "science-fiction-enthusiasts": {
    name: "Science Fiction Enthusiasts",
    description: "Explore futuristic worlds and advanced tech.",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    logo: "https://cdn-icons-png.flaticon.com/512/3261/3261330.png"
  },
  // Add other clubs similarly
};

const ClubDetail = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();

  const club = clubData[clubId];

  if (!club) {
    return <div className="club-detail"><p>Club not found.</p></div>;
  }

  return (
    <div className="club-detail">
      <button className="back-button" onClick={() => navigate("/clubs")}>← Back to Clubs</button>
      <div className="banner" style={{ backgroundImage: `url(${club.banner})` }}>
        <img src={club.logo} alt={`${club.name} Logo`} className="club-logo" />
        <h2>{club.name}</h2>
      </div>
      <p className="club-description">{club.description}</p>
    </div>
  );
};

export default ClubDetail;

// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Clubs from "./pages/Clubs"; 
import ClubDetail from "./pages/ClubDetail";
import Community from "./pages/Community";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/:clubId" element={<ClubDetail />} />
        <Route path="/clubs/:clubSlug" element={<ClubDetail />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
};

export default App;

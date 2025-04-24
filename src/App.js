// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Clubs from "./pages/Clubs"; 
import ClubDetail from "./pages/ClubDetail";
import Community from "./pages/Community";
import CreateClub from "./pages/CreateClub";
import AddBook from "./pages/AddBook";
import { ClubProvider } from "./context/ClubContext";

const App = () => {
  return (
    <ClubProvider>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/profile" element={<Navigate to="/profile/123" />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/create" element={<CreateClub />} />
          <Route path="/clubs/:clubId/add-book" element={<AddBook />} />
          <Route path="/clubs/:clubId" element={<ClubDetail />} />
          <Route path="/clubs/:clubSlug" element={<ClubDetail />} />
          <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
    </ClubProvider>
    
  );
};

export default App;

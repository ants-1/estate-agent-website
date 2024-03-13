import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import PropertyPage from "./components/PropertyPage";
import PropertySearchPage from "./components/PropertySearchPage";
import RegisterPage from "./components/RegisterPage";
import SignInPage from "./components/SignInPage";
import Footer from "./components/Footer";
import FavoriteListPage from "./components/FavoriteListPage";
import Navbar from "./components/Navbar";

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleAddToFavorites = (property) => {
    // Check if the property already exists in favorites by comparing IDs
    const isPropertyExist = favorites.some(
      (favProperty) => favProperty.id === property.id
    );

    if (!isPropertyExist) {
      // If the property doesn't exist, add it to favorites
      setFavorites([...favorites, property]);

      setShowAddAlert(true);
      setTimeout(() => {
        setShowAddAlert(false);
      }, 700);
    }
  };

  const handleRemoveFromFavorites = (propertyId) => {
    // Filter out the property to be removed based on its ID
    const updatedFavorites = favorites.filter(
      (property) => property.id !== propertyId
    );

    setFavorites(updatedFavorites);

    setShowDeleteAlert(true);
    setTimeout(() => {
      setShowDeleteAlert(false);
    }, 700);
  };

  const handleClearList = () => {
    setFavorites([]);
  };

  useEffect(() => {
    // Save favorites to local storage whenever it changes
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    // Load favorites from local storage on component mount
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <Router>
      <Navbar />
      {/* Display alert when a property is saved as a favorite */}
      {showAddAlert && (
        <div className="alert-overlay">
          <div className="alert alert-success" role="alert">
            Favorite has been saved!
          </div>
        </div>
      )}
      {/* Display alert when a property is deleted as a favorite */}
      {showDeleteAlert && (
        <div className="alert-overlay">
          <div className="alert alert-danger" role="alert">
            Favorite has been deleted!
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Display page based on ID */}
        <Route exact path="/properties/:id.html" element={<PropertyPage />} />
        <Route
          exact
          path="/property-search"
          element={
            <PropertySearchPage
              handleAddToFavorites={handleAddToFavorites}
              onRemoveFromFavorites={handleRemoveFromFavorites}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          path="/favorite-list"
          element={
            <FavoriteListPage
              favorites={favorites}
              onRemoveFromFavorites={handleRemoveFromFavorites}
              onClearFavorites={handleClearList}
            />
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;

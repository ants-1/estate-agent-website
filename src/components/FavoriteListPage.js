import React from "react";
import FavoriteCard from "./FavoriteCard";

const FavoriteList = ({ favorites, onRemoveFromFavorites,  onClearFavorites}) => {
  // Clear favorite list  
  const handleClearList = () => {
        onClearFavorites();
      };

  return (
    <div>
      <h2 className="text-center pt-5">Favorite Properties</h2>
      <div className="d-flex flex-column align-items-center m-5 gap-5">
        {/* Clear favorite list button */}
        <button type="button" className="btn btn-primary text-light" onClick={handleClearList}>Clear List</button>
        
        {favorites.length === 0 ? (
          // Displays if favorite list is empty
          <p className="text-center py-5 my-5">Favorite list is empty</p>
        ) : (
          // Display each FavoriteCard in favorites
          favorites.map((property) => (
            <FavoriteCard
              key={property.id}
              property={property}
              onRemoveFromFavorites={onRemoveFromFavorites}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FavoriteList;

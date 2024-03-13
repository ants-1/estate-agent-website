import React from "react";
import { useDrop } from "react-dnd";
import FavoriteCard from "./FavoriteCard";
import DraggableItem from "./DraggableItem";

const DropTarget = ({ properties, favorites, setFavorites }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => {
      const propertyToAdd = properties.find((prop) => prop.id === item.id);
      if (propertyToAdd && !favorites.find((fav) => fav.id === item.id)) {
        setFavorites([...favorites, propertyToAdd]);
      }
    },
    collect: (monitor) => ({
      // Check if an item is currently being dragged over the drop target
      isOver: !!monitor.isOver(),
    }),
  });

  // Remove a property from favorites based on id
  const handleRemoveFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
  };

  return (
    <div ref={drop} className="h-100 p-2">
      {favorites.map((favorite, index) => (
        <div key={index} className="d-flex align-items-center">
          <DraggableItem>
            <FavoriteCard
              property={favorite}
              onRemoveFromFavorites={handleRemoveFromFavorites}
            />
          </DraggableItem>
        </div>
      ))}
      {/* Display message when favorite list is empty */}
      {isOver && favorites.length === 0 && <p>Drop here</p>}
    </div>
  );
};

export default DropTarget;

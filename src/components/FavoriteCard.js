import React from "react";
import { Link } from "react-router-dom";

const FavoriteCard = ({ property, onRemoveFromFavorites }) => {
  const { id, type, price, bedrooms, location, picture, added } = property;

  const handleRemove = () => {
    // Remove from favorite from list based on id
    onRemoveFromFavorites(id);
  };

  // Format price
  const formattedPrice = parseFloat(price).toLocaleString("en-UK");

  return (
    <div className="card bg-light d-flex flex-column flex-md-row mx-5 mx-md-0">
      {/* Link to PropertyPage based on id */}
      <Link
        to={`/properties/${id}.html`}
        className="property-card-link text-dark text-decoration-none"
      >
        <img
          src={picture}
          className="card-img-top img-fluid"
          alt={`Property: ${type}`}
        />
      </Link>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">£{formattedPrice}</h5>
          <h6 className="card-subtitle mb-2 text-secondary">
            {bedrooms} Bedroom, {type}
          </h6>
          <h6 className="card-subtitle mb-2 fw-bold">
            {location && location.name
              ? location.name
              : "Location Not Available"}
          </h6>
          <p className="card-text">
            {added && added.month
              ? `${added.month}, ${added.day}, ${added.year}`
              : "Date Not Available"}
          </p>
        </div>
        <div className="d-flex justify-content-center gap-2 pt-4">
          {/* Remove property from favorite list */}
          <button
            type="button"
            className="btn btn-primary fw-bold"
            onClick={handleRemove}
          >
            ❌ Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;

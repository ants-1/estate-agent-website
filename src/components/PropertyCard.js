import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property, handleAddToFavorites }) => {
  const { id, type, price, bedrooms, location, picture, description, added } =
    property;

  // Limit the description to 15 words
  const limitDescription = (description, limit = 15) => {
    const words = description.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " ...";
    }
    return description;
  };

  const shortDescription = limitDescription(description);

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
          <h6 className="card-subtitle mb-2 fw-bold">{location.name}</h6>
          <p>{shortDescription}</p>
          <p className="card-text">
            {added.month} {added.day}, {added.year}
          </p>
        </div>
        <div className="d-flex justify-content-center gap-2 pt-4">
          <button type="button" className="btn btn-primary fw-bold">
            📞 Call
          </button>
          <button type="button" className="btn btn-primary fw-bold">
            ✉️ Contact
          </button>
          {/* Add to favorites button */}
          <button
            type="button"
            className="btn btn-primary fw-bold"
            onClick={() => handleAddToFavorites(property)}
          >
            ♡ Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

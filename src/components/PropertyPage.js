import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PropertyDetails from "./PropertyDetails";

const PropertyPage = () => {
  const [property, setProperty] = useState(null);
  const { id } = useParams();
  const [showAllImages, setShowAllImages] = useState(false);

  // Fetch property data based on the ID from the URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/properties.json");
        const data = await response.json();
        const selectedProperty = data.properties.find((prop) => prop.id === id);

        setProperty(selectedProperty);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!property) {
    return <div className="text-center p-5">Loading...</div>;
  }

  const {
    type,
    price,
    tenure,
    bedrooms,
    location,
    description,
    added,
    picture,
    images,
    floorplan,
  } = property;

  // Format price to include a comma after the third digit
  const formattedPrice = parseFloat(price).toLocaleString("en-UK");

  const tenureType = property.tenure === "Freehold" ? "Guide price" : "Rent";
  const rentInfo = property.tenure === "Freehold" ? "" : " Per month";

  const displayedImages = showAllImages
    ? Object.keys(images)
    : Object.keys(images).slice(0, 3);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="bg-dark text-light d-flex justify-content-evenly align-items-center pt-5 pb-4 w-100">
        {/* Link to PropertySearchPage */}
        <Link
          to="/property-search"
          className="text-light text-decoration-none mb-3"
        >
          ← Back to search results
        </Link>
        {/* Link to FavoriteListPage */}
        <Link
          to="/favorite-list"
          className="text-light text-decoration-none mb-3"
        >
          <button className="btn btn-light">♡ Favorites</button>
        </Link>
      </div>
      {/* Property details */}
      <div className="property d-flex flex-column align-items-center mt-4">
        <img src={picture} className="img-fluid w-75" alt="Property" />
        <div className="d-flex flex-column w-75 py-5">
          <p className="fw-bold">{tenure}</p>
          <h6>{tenureType}</h6>
          <div className="d-flex gap-2">
            <h5 className="fw-bold">£{formattedPrice}</h5>
            <span>{rentInfo}</span>
          </div>
          <h6>
            {bedrooms} Bedroom, {type}
          </h6>
          <h6>{location.name}</h6>
          <p>
            {added.month}, {added.day}, {added.year}
          </p>
        </div>
        <h4 className="mb-4">Images</h4>
        <div className="d-flex flex-wrap w-75">
          <img src={picture} className="img-fluid w-50" alt="House Images" />
          {displayedImages.map((key, index) => (
            <img
              key={index}
              src={images[key]}
              className="img-fluid w-50"
              alt={`House ${index + 1}`}
            />
          ))}
        </div>
        {/* Show rest of images */}
        {!showAllImages && Object.keys(images).length > 4 && (
          <button
            type="button"
            className="btn btn-primary mt-5"
            onClick={() => setShowAllImages(true)}
          >
            View More
          </button>
        )}
      </div>
      {/* Display property detail's tablist */}
      <PropertyDetails
        description={description}
        floorPlan={floorplan}
        location={location}
      />
    </div>
  );
};

export default PropertyPage;

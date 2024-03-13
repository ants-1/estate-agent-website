import React from "react";

const MapComponent = ({ location }) => {
  console.log("Received location:", location);

  // Check if the location data is invalid or missing required fields
  if (!location || (!location.name && !location.lat && !location.lon)) {
    console.error("Invalid location data:", location);
    // Returns message if location data is invalid
    return <div className="text-center p-5">No location data available</div>;
  }

  // Here map
  const getHereMapUrl = (city) => {
    const zoomLevel = 12;
    const width = 500;
    const height = 350;
    const apiKey = "sBpFnywZxVPGrtC6InnEkX_47smbbW_nUwG39TfOO00";
    const marker = `&poi=${city.lat},${city.lon}`;

    return `https://image.maps.ls.hereapi.com/mia/1.6/mapview?c=${city.lat},${city.lon}&z=${zoomLevel}&apiKey=${apiKey}&w=${width}&h=${height}${marker}`;
  };

  console.log("Map URL:", getHereMapUrl(location));

  return (
    <div>
      <img
        src={getHereMapUrl(location)}
        className="img-fluid"
        alt={`Map for ${location.name}`}
      />
    </div>
  );
};

export default MapComponent;

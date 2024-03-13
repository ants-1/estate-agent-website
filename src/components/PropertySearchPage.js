import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import SearchBar from "./SearchBar";
import FavoriteCard from "./FavoriteCard";
import { DropdownList } from "react-widgets";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "./DraggableItem";
import DropTarget from "./DropTarget";
import "react-widgets/styles.css";

const PropertySearchPage = ({
  handleAddToFavorites,
  onRemoveFromFavorites,
  favorites,
  setFavorites,
}) => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [droppedItem, setDroppedItem] = useState(null);

  const handleDrop = (item) => {
    setDroppedItem(item.id);

    // Check if the dropped item already exists in favorites
    const existsInFavorites = favorites.find((fav) => fav.id === item.id);
    if (!existsInFavorites) {
      // Add the dropped item to favorites if it doesn't exist already
      handleAddToFavorites(item);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/properties.json");
        const data = await response.json();
        setProperties(data.properties);
        setFilteredProperties(data.properties);
        setFilteredFavorites(favorites);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [favorites]);

  function filterByTenure(tenureType) {
    let filtered = properties; 

    // Filter properties by tenure type
    if (tenureType === "Freehold") {
      filtered = properties.filter(
        (property) => property.tenure.toLowerCase() === "freehold"
      );
    } else if (tenureType === "Leasehold") {
      filtered = properties.filter(
        (property) => property.tenure.toLowerCase() === "leasehold"
      );
    }

    setFilteredProperties(filtered);
    setShowFavorites(false);
  }

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm.toLowerCase());

    if (searchTerm) {
      // Filter properties by search term
      const filteredProps = properties.filter(
        (property) =>
          property.location.name.toLowerCase().includes(searchTerm) ||
          property.type.toLowerCase().includes(searchTerm)
      );

      // Filter favorites by search term
      const filteredFavs = favorites.filter(
        (favorite) =>
          favorite.location.name.toLowerCase().includes(searchTerm) ||
          favorite.type.toLowerCase().includes(searchTerm)
      );

      setFilteredProperties(
        showFavorites && favorites.length > 0 ? filteredFavs : filteredProps
      );
      setFilteredFavorites(filteredFavs);
      setShowFavorites(showFavorites && favorites.length > 0);
    } else {
      setFilteredProperties(showFavorites ? filteredFavorites : properties);
    }
  };

  const handleFilter = (filterType) => {
    let filtered = showFavorites
      ? [...filteredFavorites]
      : [...filteredProperties];

    switch (filterType) {
      case "Sort by Price (Low to High)":
        const freeholdProps = filtered.filter(
          (property) => property.tenure === "Freehold"
        );
        const leaseholdProps = filtered.filter(
          (property) => property.tenure === "Leasehold"
        );

        freeholdProps.sort((a, b) => a.price - b.price);
        leaseholdProps.sort((a, b) => a.price - b.price);

        filtered = [...freeholdProps, ...leaseholdProps];
        break;
      case "Sort by Price (High to Low)":
        const freeholdPropsHighToLow = filtered
          .filter((property) => property.tenure === "Freehold")
          .sort((a, b) => b.price - a.price);

        const leaseholdPropsHighToLow = filtered
          .filter((property) => property.tenure === "Leasehold")
          .sort((a, b) => b.price - a.price);

        filtered = [...freeholdPropsHighToLow, ...leaseholdPropsHighToLow];
        break;
      case "Sort by Latest Date Added":
        filtered.sort((a, b) => {
          const dateA = new Date(
            `${a.added.month} ${a.added.day}, ${a.added.year}`
          );
          const dateB = new Date(
            `${b.added.month} ${b.added.day}, ${b.added.year}`
          );
          return dateB - dateA;
        });
        break;
      case "Sort by Oldest Date Added":
        filtered.sort((a, b) => {
          const dateA = new Date(
            `${a.added.month} ${a.added.day}, ${a.added.year}`
          );
          const dateB = new Date(
            `${b.added.month} ${b.added.day}, ${b.added.year}`
          );
          return dateA - dateB;
        });
        break;
      case "Find Min/Max Bedrooms":
        filtered.sort((a, b) => {
          const bedA = a.bedrooms;
          const bedB = b.bedrooms;
          return bedA - bedB;
        });
        break;
      case "Find Max/Min Bedrooms":
        filtered.sort((a, b) => {
          const bedA = a.bedrooms;
          const bedB = b.bedrooms;
          return bedB - bedA;
        });
        break;
      default:
        break;
    }

    if (showFavorites) {
      setFilteredFavorites(filtered);
    } else {
      setFilteredProperties(filtered);
    }
  };

  

  const dropdownOptions = [
    "Sort by Price (Low to High)",
    "Sort by Price (High to Low)",
    "Sort by Latest Date Added",
    "Sort by Oldest Date Added",
    "Find Max/Min Bedrooms",
    "Find Min/Max Bedrooms",
  ];

  dropdownOptions.sort();

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="bg-dark text-light d-flex flex-column align-items-center gap-4 py-5 ">
          <SearchBar handleSearch={handleSearch} />
          <div className="dropdown d-flex gap-3 align-items-baseline">
            <p>Filter:</p>
            {/* Dropdown filter for search bar */}
            <DropdownList
              data={dropdownOptions}
              onChange={(value) => handleFilter(value)}
              placeholder="Select an option"
            />
          </div>
          <div className="d-flex justify-content-center w-100">
            <div className="d-flex row align-items-stretch w-75 gap-2 justify-content-center">
              {/* Show all properties */}
              <button
                type="button"
                className="btn col btn-primary text-center flex-grow-1"
                onClick={() => filterByTenure("")}
              >
                All
              </button>
              {/* Show all 'for sale' properties */}
              <button
                type="button"
                className="btn col btn-primary text-center flex-grow-1"
                onClick={() => filterByTenure("Freehold")}
              >
                For Sale
              </button>
              {/* Show all 'for rent' properties */}
              <button
                type="button"
                className="btn col btn-primary text-center flex-grow-1"
                onClick={() => filterByTenure("Leasehold")}
              >
                For Rent
              </button>
            </div>
          </div>

          <div className="text-light d-flex align-items-center">
            <button className="btn btn-light" onClick={toggleFavorites}>
              {showFavorites ? "Back to Search" : "♡ Favorites"}
            </button>
          </div>
        </div>
        <div className="results d-flex flex-column align-items-center m-5 gap-5">
          {showFavorites ? (
            favorites.length === 0 ? (
              <p className="text-center py-5 my-5">Favorite list is empty</p>
            ) : (
              // Display favorites
              filteredFavorites.map((property) => (
                <FavoriteCard
                  key={property.id}
                  property={property}
                  onRemoveFromFavorites={onRemoveFromFavorites}
                />
              ))
            )
          ) : (
            // Display properties
            filteredProperties.map((property) => (
              <DraggableItem key={property.id}>
                <PropertyCard
                  key={property.id}
                  property={property}
                  handleAddToFavorites={handleAddToFavorites}
                />
              </DraggableItem>
            ))
          )}
        </div>

      {/* Button to toggle the sidebar */}
        <button
          type="button"
          className="btn btn-primary sidebar-toggle"
          onClick={toggleSidebar}
        >
          ★
        </button>
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <h3 className="pt-2 text-center">Favorite List</h3>
          <DropTarget
            properties={properties}
            onDrop={handleDrop}
            name={droppedItem}
            favorites={favorites}
            setFavorites={setFavorites}
            onRemoveFromFavorites={onRemoveFromFavorites}
          />
        </div>
      </DndProvider>
    </>
  );
};

export default PropertySearchPage;

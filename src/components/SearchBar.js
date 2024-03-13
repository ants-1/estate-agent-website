import React, { useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  const handleClick = () => {
    handleSearch(searchTerm);
  };

  return (
    <div className="input-group w-50">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search properties..."
        className="form-control rounded-0"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      {/* Search button */}
      <div className="search-bar input-group-append">
        <button
          className="btn btn-primary rounded-0"
          type="button"
          onClick={handleClick}
        >
          🔍
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

import React, { useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    handleSearch("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="input-group">
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search for Artworks..."
        aria-label="Search"
        aria-describedby="search-addon"
        style={{ height: "2.5rem" }} 
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {searchQuery && (
        <button
          type="button"
          className="btn clear-button"
          style={{ height: "2.5rem" }} 
          onClick={handleClear}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
      <button
        type="button"
        className="btn custom-button"
        style={{ height: "2.5rem" }} 
        onClick={handleSubmit}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchBar;





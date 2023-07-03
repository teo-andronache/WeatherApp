import React, { useState } from "react";
import "./SearchBar.css";
/* Duplicate code. */
type SearchBarProps = {
    onSearch: (searchTerm: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="SearchBar-container">
            <input
                className="SearchBar-input"
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button className="SearchBar-button" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default SearchBar;

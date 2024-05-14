import React, { useState, useEffect } from "react";
import "./SearchBar.css";
/* Duplicate code. */
type SearchBarProps = {
    initialTerm?: string; // Add initialTerm prop
    onSearch: (searchTerm: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ initialTerm = "Galati", onSearch }) => {
    const [searchTerm, setSearchTerm] = useState(initialTerm);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);

    };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        const lastSearchedTerm = localStorage.getItem("lastSearchedTerm");
        if (lastSearchedTerm) {
            setSearchTerm(lastSearchedTerm);
            onSearch(lastSearchedTerm); // Trigger the API call again
        }
    }, []);

    return (
        <div className="SearchBar-container">
            <input
                className="SearchBar-input"
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <button className="SearchBar-button" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default SearchBar;

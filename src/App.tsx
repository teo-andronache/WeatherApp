import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import videoBackground from './assets/video3.mp4';
import './App.css';

function App() {
  const handleSearch = (searchTerm: string) => {

    console.log("Search term:", searchTerm);
  };

  return (
    <>
      <div className='App'>
        <div className='search-bar-container'>
          <SearchBar onSearch={handleSearch} />
        </div>
        <video src={videoBackground} autoPlay loop muted />
      </div>
    </>
  );
}

export default App;

import React, { useState } from 'react'
import videoBackground from './assets/video3.mp4';
import './App.css'




function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className='App'>
        <div className='search-bar-container'>
          <div>SearchBar</div>
          <div>SearchResults</div>
        </div>
        <video src={videoBackground} autoPlay loop muted />

      </div>

    </>
  )
}

export default App

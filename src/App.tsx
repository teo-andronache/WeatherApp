import React, { useState } from 'react';
import { WiDaySunny, WiThunderstorm, WiCloudy, WiRain, WiSnow, WiWindy } from 'react-icons/wi';
import videoBackground from './assets/video3.mp4';
import './App.css';
import SearchBar from './components/SearchBar';


type WeatherData = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    air_quality: {
      co: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
    };
  };
}


type SearchResult = {
  name: string;
  temperature: number;
  windKPH: number;
  humidity: number;
  condition: string;
  localtime: string;
};

function App() {

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const getIconByCondition = (condition: string) => {
    if (condition.includes("rain") || condition.includes("Rain") || condition.includes("drizzle")) {
      return <WiRain className='rain-icon' />;
    } else if (condition.includes("Sun") || condition.includes("Clear")) {
      return <WiDaySunny className='sun-icon' />;
    } else if (condition.includes("Snow") || condition.includes("snow")) {
      return <WiSnow className='snow-icon' />;
    } else if (condition.includes("Wind") || condition.includes("wind")) {
      return <WiWindy className='windy-icon' />;
    } else if (condition.includes("Thunder") || condition.includes("thunder")) {
      return <WiThunderstorm className='thunderstorm-icon' />;
    } else if (condition.includes("Cloud") || condition.includes("cloud") || condition.includes("Overcast")) {
      return <WiCloudy className='cloudy-icon' />;
    }

  };

  /* Handling the searching an extracting the meaningful info. */
  const handleSearch = async (searchTerm: string) => {

    try {
      const apiKey = "17b74a5a5e844ac0b25133450230307";
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchTerm}&aqi=yes`
      );

      const data: WeatherData = await response.json();
      const currentTemperature = data.current.temp_c;
      const currentName = data.location.name;
      const currentWindKPH = data.current.wind_kph;
      const currentHumidity = data.current.humidity;
      const currentCondition = data.current.condition.text;
      const currentLocaltime = data.location.localtime;


      const searchResult: SearchResult = {
        name: currentName,
        temperature: currentTemperature,
        windKPH: currentWindKPH,
        humidity: currentHumidity,
        condition: currentCondition,
        localtime: currentLocaltime
      };

      setSearchResults([searchResult]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <div className='App'>
      <div className='search-bar-container'>
        <SearchBar onSearch={handleSearch} />
      </div>
      <video src={videoBackground} autoPlay loop muted />
      <div className='search-results-container'>
        {searchResults.map((result, index) => (
          <div key={index} className='search-result'>
            <div className='result-name'>{result.name}
              {" - " + result.localtime.slice(11, 16)}
            </div>
            <div className='result-temperature'>{result.temperature}°C</div>
            <div className='result-condition'>
              {result.condition}
              {getIconByCondition(result.condition)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

export default App;

import React, { useState } from 'react';
import { WiDaySunny, WiThunderstorm, WiCloudy, WiRain, WiSnow, WiWindy } from 'react-icons/wi';
import videoBackground from './assets/video3.mp4';
import './App.css';
import SearchBar from './components/SearchBar';
import TempButton from './components/SwitchButton';

type WeatherResponse = {
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
  };
  forecast: {
    forecastday: {
      date: string;
      date_epoch: number;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avgtemp_c: number;
        avgtemp_f: number;
        maxwind_mph: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        totalprecip_in: number;
        totalsnow_cm: number;
        avgvis_km: number;
        avgvis_miles: number;
        avghumidity: number;
        daily_will_it_rain: number;
        daily_chance_of_rain: number;
        daily_will_it_snow: number;
        daily_chance_of_snow: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        uv: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: string;
        is_moon_up: number;
        is_sun_up: number;
      };
      hour: {
        time_epoch: number;
        time: string;
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
        windchill_c: number;
        windchill_f: number;
        heatindex_c: number;
        heatindex_f: number;
        dewpoint_c: number;
        dewpoint_f: number;
        will_it_rain: number;
        chance_of_rain: number;
        will_it_snow: number;
        chance_of_snow: number;
        vis_km: number;
        vis_miles: number;
        gust_mph: number;
        gust_kph: number;
        uv: number;
      }[];
    }[];
  };
};

type ForecastDay = {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
  hour: {
    time_epoch: number;
    time: string;
    temp_c: number;
    temp_f: number;
    // Add other properties as needed
  }[];
};

type SearchResult = {
  name: string;
  temperatureC: number;
  temperatureF: number;
  windKPH: number;
  humidity: number;
  condition: string;
  localtime: string;
  forecasts: ForecastDay[];
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedUnit, setSelectedUnit] = useState("celsius");
  const hasText = (searchResults) => {
    return searchResults.some((result) => result.name.trim() !== '');
  };

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

  const getDayOfWeek = (date: string) => {
    const currentDate = new Date();
    const day = new Date(date);
    const dayOfWeek = day.toLocaleDateString("en-US", { weekday: "long" });

    if (day.toDateString() === currentDate.toDateString()) {
      return "Today";
    } else {
      return dayOfWeek;
    }
  };


  const handleSearch = async (searchTerm: string) => {
    try {
      const apiKey = "17b74a5a5e844ac0b25133450230307";

      const forecast = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchTerm}&days=3&aqi=no&alerts=no`);
      const data: WeatherResponse = await forecast.json();

      const currentTemperatureC = data.current.temp_c;
      const currentTemperatureF = data.current.temp_f;
      const currentName = data.location.name;
      const currentWindKPH = data.current.wind_kph;
      const currentHumidity = data.current.humidity;
      const currentCondition = data.current.condition.text;
      const currentLocaltime = data.location.localtime;
      const currentForecasts = data.forecast.forecastday;

      const searchResult: SearchResult = {
        name: currentName,
        temperatureC: currentTemperatureC,
        temperatureF: currentTemperatureF,
        windKPH: currentWindKPH,
        humidity: currentHumidity,
        condition: currentCondition,
        localtime: currentLocaltime,
        forecasts: currentForecasts,
      };

      setSearchResults([searchResult]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Handle the error (e.g., show an error message)
    }
  };
  const handleUnitChange = (unit: string) => {
    setSelectedUnit(unit);
    handleSearch(searchTerm);
  };

  return (
    <div className='App'>
      <div className='search-bar-container'>
        <SearchBar onSearch={handleSearch} />
        <TempButton onUnitChange={handleUnitChange} />
      </div>

      <div className={`${hasText(searchResults) ? 'search-result-container' : 'search-result-container-empty'}`}>
        {searchResults.map((result, index) => (
          <div key={index} className='search-result'>
            <div className='result-name'>{result.name}
              {" - " + result.localtime.slice(11, 16)}
            </div>
            <div className='result-temperature'>{selectedUnit === "celsius" ? result.temperatureC : result.temperatureF}°{selectedUnit === "celsius" ? "C" : "F"}</div>
            <div className='result-condition'>
              {result.condition}{getIconByCondition(result.condition)}
            </div>
            <div className='result-forecast'>
              {result.forecasts && result.forecasts.length > 0 ? (
                <ul>
                  {result.forecasts.slice(0, 7).map((forecast, i) => (
                    <li key={i}>
                      <p>{getDayOfWeek(forecast.date)}</p>
                      <p>{selectedUnit === 'celsius' ? forecast.day.mintemp_c : forecast.day.mintemp_f}°{selectedUnit === 'celsius' ? 'C' : 'F'} ~ {selectedUnit === 'celsius' ? forecast.day.maxtemp_c : forecast.day.maxtemp_f}°{selectedUnit === 'celsius' ? 'C' : 'F'} {getIconByCondition(forecast.day.condition.text)}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No forecast available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

export default App;

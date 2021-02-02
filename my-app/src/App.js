import React, { useState } from "react";
import Axios from 'axios';
import './App.css';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


function App() {
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState({
     description: "",
     temp: 0,
     humidity: 0,
     sunrise:0,
     sunset: 0,
     country: ""
       
      
  })
  const [dataLoaded, setDataLoaded] = useState(false)
  

  const searchWeather = () => {
    Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  ).then((response)=> {
      console.log(response.data);
      setWeatherData({
        description: response.data.weather[0].description,
         temp: response.data.main.temp, 
         humidity: response.data.main.humidity,
        country: response.data.sys.country
       
    });
    setDataLoaded(true);
    });
  };
  

  return (
    <div className="App">
     <h1 style={{ textTransform:"uppercase",color: "Gray"}}>Current Weather</h1>
     <input type="text" placeholder="City Name" onChange={(e) =>{
       setCity(e.target.value);
       console.log(e.target.value);
     }}
      />
     <button onClick={searchWeather}>Search</button>
     {dataLoaded && (
       <div className="displayData" style={{color:"#fff",backgroundColor:"gray"}}>
       
       <h1>country:{weatherData.country}</h1>
       <h3>Discription:{weatherData.description}</h3>
       <h3>temp: {Math.round(weatherData.temp)}°</h3>
       <h3>humidity:{weatherData.humidity}</h3>
       </div>
       )}

       
        
    </div>
   
  );
}

export default App;

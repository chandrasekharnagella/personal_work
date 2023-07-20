 //import hotBg from './assests/hot.jpeg';
 import coldBg from './assests/hotweather.jpg';

 import cloudSun from'./assests/cloudsun.png';
import Description from './components/Description';
import { useEffect, useState } from 'react';
import {getFormattedWeatherDate} from './components/weatherservice.js';

//import { Home } from './components/Home';

function App() {
  const [city,setCity] = useState("bangalore")
  const [weather, setWeather] = useState(null);
  const [units,setUnits]= useState("imperial");
  // const [bg,setBg] = useState(hotBg)

useEffect (() =>{
  const ferWeatherData =async () =>{
  const data= await getFormattedWeatherDate(city , units)
  setWeather(data);

  //dynamic bg

  // const threshold = units === 'matric' ? 20:60;
  // if(data.temp <= threshold) setBg(coldBg);
  // else setBg(hotBg);

};

ferWeatherData();
},[ units, city]);

const handleUnitsClick = (e) => {
  const button =e.currentTarget;
  const currentUnit= button.innerText.slice(1);


  const isCelsius = currentUnit === "C";
  button.innerText = isCelsius ? "°F" : "°C";
  setUnits(isCelsius?"matric" : "imperial")
}

const enterKeyPressed= (e) => {
    if(e.keyCode === 13){
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
}

  return (
    <div className="app" style={{backgroundImage:`url(${coldBg})`}}>
      <div className='overlay'>
        {
          weather && (
            <div className='container'>
            <div className='section section__inputs'>
  
                <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder='Enter City' />
  
                <button onClick={(e) => handleUnitsClick(e)}> °F  </button>
  
            </div>
  
            <div className='sectionn section__temperature'>
  
                <div className='icon'>
                  
                      <h3> {`${weather.name},${weather.country}`}</h3>
  
                      <img src={weather.iconURL} alt="weathericon"/>
  
                      <h3> {weather.description}</h3>
  
                </div>
  
                <div className='temperature'>
  
                  <h1>{ ` ${weather.temp.toFixed()}°${units === "matric" ? "C" : "F"} `}</h1>
  
                </div>
  
            </div>
            {/* Bottom description  */}
  
            <Description weather={weather} units={units}/>
  
          </div>
          )}
       
      </div>
    </div>
  );
}

export default App;

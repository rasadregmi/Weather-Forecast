import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [city, setCity] = useState(''); //To hold the value of input field (i.e. city name)
  let [wdetails, setWdetails] = useState(); //To hold the information of the weather (i.e. weather details)
  let [isloading, setIsloading] = useState(false); //To handle loading

  let getData = (event) => {
    let APIKEY = 'e10147ebf823be4f3a105bd2cf80d2a0';
    setIsloading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
      .then((response) => response.json())
      .then((finalResponse) => {
        setWdetails(finalResponse);
        if (finalResponse.cod == "404") {
          setWdetails(undefined)
        }
        else {
          setWdetails(finalResponse)
        }
        setIsloading(false)
      })

    event.preventDefault();
    setCity(''); //Clears data from input field after user submits
  }

  return (
    <div className="container">
      <div className="wrapper">

        <h1 className="title">Weather Forecast</h1>

        <form onSubmit={getData}>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City Name" />
          <button>Search</button>
        </form>

        <div className="weather-box">
          <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" width={100}
            style={{ position: 'absolute', top: '15%', left: '35%', visibility: isloading ? 'visible' : 'hidden' }} />
          {
            wdetails != undefined
              ?
              <>
                <h3 className="weather-title">{wdetails.name}, <span>{wdetails.sys.country}</span></h3>
                <h2 className="weather-temp">{wdetails.main.temp} <sup>o</sup>C</h2>
                <img src={`http://openweathermap.org/img/w/${wdetails.weather[0].icon}.png`} alt="Weather Icon" className="weather-icon" />
                <p className="weather-description">{wdetails.weather[0].description}</p>
              </>
              :
              "No Data!!"
          }

        </div>

      </div>
    </div>
  );
}

export default App;

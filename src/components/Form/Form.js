import React, { useState } from "react";
import "./Form.css";

const api = {
  key: "cd4397e1017b84060db88b312eb88790",
  base: "https://api.openweathermap.org/data/2.5/",
};

const WeatherForm = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const searchHandler = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const currentDateHandler = (input) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[input.getDay()];
    let date = input.getDate();
    let month = months[input.getMonth()];
    let year = input.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className={"card-container"}>
      <div
        className={
          typeof weather.main != "undefined"
            ? weather.main.temp > 16
              ? "card"
              : "card cold"
            : "card"
        }
      >
        <h1>SS Weather Forecast</h1>

        <input
          type="text"
          className="search-bar"
          placeholder="Enter location Eg: Kingston, Jamaica"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          onKeyPress={searchHandler}
        />

        {typeof weather.name != "undefined" ? (
          <React.Fragment>
            <div className={"location-container"}>
              <div className={"location"}>
                {weather.name}, {weather.sys.country}
              </div>
              <div className={"date"}>{currentDateHandler(new Date())}</div>
            </div>

            <div className={"weather-container"}>
              <div className={"temp-info"}>
                {Math.round(weather.main.temp)}°C
              </div>
              <div className={"weather-status"}>{weather.weather[0].main}</div>
            </div>

            <div className={"weather-details-container"}>
              <div className={"left-container"}>
                <div className={"containers-1-2-wrap"}>
                  <div className={"left-container-1"}>Description</div>
                  <div className={"left-container-2"}>
                    {weather.weather[0].description}
                  </div>
                </div>

                <div className={"containers-1-2-wrap"}>
                  <div className={"left-container-1"}>Feels like</div>
                  <div className={"left-container-2"}>
                    {Math.round(weather.main.feels_like)}°C
                  </div>
                </div>

                <div className={"containers-1-2-wrap"}>
                  <div className={"left-container-1"}>Min Temp</div>
                  <div className={"left-container-2"}>
                    {Math.round(weather.main.feels_like)}°C
                  </div>
                </div>
              </div>

              <div className={"right-container"}>
                <div className={"containers-1-2-wrap"}>
                  <div className={"right-container-1"}>Wind</div>
                  <div className={"right-container-2"}>
                    {weather.wind.speed} Km/hr
                  </div>
                </div>

                <div className={"containers-1-2-wrap"}>
                  <div className={"right-container-1"}>Pressure</div>
                  <div className={"right-container-2"}>
                    {weather.main.pressure} hPa
                  </div>
                </div>

                <div className={"containers-1-2-wrap"}>
                  <div className={"right-container-1"}>Max Temp</div>
                  <div className={"right-container-2"}>
                    {Math.round(weather.main.temp_max)}°C
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default WeatherForm;

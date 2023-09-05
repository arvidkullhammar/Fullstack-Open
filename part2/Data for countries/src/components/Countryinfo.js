import { useState, useEffect } from "react";
import weatherService from "../services/weatherService";

const Countryinfo = ({ country, detailed, callback }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    if (detailed) {
      weatherService
        .getCountryWeather(country)
        .then((data) => setWeather(data));
    }
  }, []);

  const tempInCelsius = (temp) => {
    const tempInCelsius = (temp - 32) * (5 / 9);

    return tempInCelsius.toFixed(2);
  };

  return (
    country && (
      <div>
        <div>
          <h1>
            {country.name.common}
            {!detailed && (
              <button onClick={() => callback(country)}>Show</button>
            )}
          </h1>
        </div>
        {detailed && (
          <div>
            <div>
              <p>{country.capital}</p>
              <p>{country.area}</p>
            </div>
            <div>
              <h2>Languages</h2>
              <ul>
                {Object.values(country.languages).map((langauge) => (
                  <li key={langauge}>{langauge}</li>
                ))}
              </ul>
            </div>
            <div>
              <img src={country.flags.png} />
            </div>
            {weather && (
              <div>
                <h2>Weather in {country.capital[0]}</h2>
                <p>Temprature {tempInCelsius(weather.main.temp)}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                />
                <p>Wind {weather.wind.speed} m/s </p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  );
};

export default Countryinfo;

import { useState } from "react";
import countryService from "./services/countryService";
import Inputfield from "./components/Input";
import Countryinfo from "./components/Countryinfo";
import { useEffect } from "react";

let allCountries = [];

const App = () => {
  const [countries, setCountries] = useState([]);
  const [previewCountry, setPreviewCountry] = useState();

  useEffect(() => {
    countryService.getAllCountries().then((fetchedCountries) => {
      allCountries = fetchedCountries;
    });
  }, []);

  const handleCallback = (country) => {
    setCountries([]);
    setPreviewCountry(country);
  };

  const countrySearch = (input) => {
    const searchList = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(input.toLowerCase())
    );
    if (searchList.length === 1) {
      console.log("if");
      setPreviewCountry(searchList[0]);
      setCountries([]);
      console.log(previewCountry);
    } else {
      setCountries(searchList);
      setPreviewCountry(null);
    }
  };

  return (
    <div>
      <Inputfield callback={countrySearch} />
      {countries.length > 10 && <p>Too many matches, specify another filter</p>}
      {countries.length >= 2 &&
        countries.length <= 10 &&
        countries.map((country) => (
          <Countryinfo
            country={country}
            key={country.area}
            callback={handleCallback}
          />
        ))}
      {previewCountry && (
        <Countryinfo
          detailed
          country={previewCountry}
          callback={handleCallback}
        />
      )}
    </div>
  );
};

export default App;

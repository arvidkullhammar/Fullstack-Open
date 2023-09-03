import { useState } from "react";
import countryService from "./services/countryService";
import Inputfield from "./components/Input";
import Countryinfo from "./components/Countryinfo";
import { useEffect } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    countryService.getAllCountries.then((countries) => setCountries(countries));
  }, []);

  const countrySearch = (input) => {
    countryService
      .getCountriesByName(input)
      .then((countries) => console.log("countries", countries));
  };

  return (
    <div>
      <Inputfield callback={countrySearch} />
      {countries.map((country) => (
        <Countryinfo country={country} id={country.area} />
      ))}
    </div>
  );
};

export default App;







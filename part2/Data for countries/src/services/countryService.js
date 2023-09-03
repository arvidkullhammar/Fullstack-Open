import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((res) => res.data).catch(() => null);
};

const getCountriesByName = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`);
  return request.then((res) => res.data).catch(() => null);
};

export default { getCountriesByName, getAllCountries };

import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const API_KEY = "78356cb28de34ccd87ac5267569a33fc";

const getAllCountries = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((res) => res.data).catch(() => null);
};

const getCountriesByName = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`);
  return request.then((res) => res.data).catch(() => null);
};

export default { getCountriesByName, getAllCountries };

import axios from "axios";

const API_KEY = "";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getCountryWeather = (country) => {
  const [latitude, longitude] = country.capitalInfo.latlng;
  const request = axios.get(
    `${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
  return request.then((res) => res.data).catch((e) => e.message);
};

export default { getCountryWeather };

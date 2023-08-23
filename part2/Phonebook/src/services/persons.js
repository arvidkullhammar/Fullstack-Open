import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = (newObj) => {
  const request = axios.post(baseUrl, newObj);
  return request.then((res) => res.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
};

const update = (updatedObj) => {
  const request = axios.put(`${baseUrl}/${updatedObj.id}`, updatedObj);
  return request.then((res) => res.data);
};

export default { getAll, create, remove, update };

import axios from "axios";
export default axios.create({
  baseURL: "https://puzzle-ute.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
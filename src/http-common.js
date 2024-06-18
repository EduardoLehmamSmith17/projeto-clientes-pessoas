import axios from "axios";

const createAxios = axios.create({
    baseURL: "http://localhost:7054/api/Pessoas/"
});

export default createAxios;
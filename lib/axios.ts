import axios from "axios";

const BASE_URL = "https://2ae3-2001-569-52c4-d700-d5fa-ec78-7080-d0ea.ngrok-free.app";

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

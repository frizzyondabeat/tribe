import axios from "axios";

const BASE_URL = "https://f2c6-2001-569-52c4-d700-1192-bb06-7a1e-6968.ngrok-free.app";

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

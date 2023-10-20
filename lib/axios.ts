import axios from "axios";

const BASE_URL = "https://53ba-2001-569-52c4-d700-cd5a-3c07-f037-23d8.ngrok-free.app";

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

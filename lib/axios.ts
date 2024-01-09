import axios from "axios";

const BASE_URL = "https://3c9c27acdc75.ngrok.app";

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

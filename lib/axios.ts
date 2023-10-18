import axios from "axios";

const BASE_URL = "https://957d-2001-569-52c4-d700-1d25-cbd7-1a08-7406.ngrok-free.app";

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

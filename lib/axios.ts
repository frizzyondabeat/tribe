import axios from "axios";

const BASE_URL = "https://448d-2001-569-52c4-d700-7956-3158-1ffe-4528.ngrok-free.app";

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 15000,
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        console.error(err);
        return Promise.reject(err);
    }
);
import axios from 'axios';
const BASE_URL = `https://andrewmta-cautious-space-spoon-57667qxr4j524x69-3500.preview.app.github.dev`;
//const BASE_URL = :3500/';
export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
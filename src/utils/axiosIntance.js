const axios = require("axios");
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;


const axiosInstance = axios.create({
    baseURL: process.env.TMDB_URl,
    headers: {
        accept: 'application/json',
        'User-Agent': 'TMDB-Proxy/1.0', // Add user-agent to avoid being blocked
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
    },
    timeout: 10000,
})

module.exports = axiosInstance;
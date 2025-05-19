require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const TMDB_API_KEY = process.env.API_KEY;

// if (!TMDB_API_KEY) {
//     console.error('TMDB_API_KEY is not set in .env file');
//     process.exit(1);
// }

// Middleware
app.use(cors());
app.use(express.json());

// Configure Axios with default settings
const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    timeout: 10000, // 10-second timeout
    headers: {
        accept: 'application/json',   
        'User-Agent': 'TMDB-Proxy/1.0' // Add user-agent to avoid being blocked
    }
});

// Function to retry failed requests
const retryRequest = async (config, maxRetries = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await axiosInstance(config);
        } catch (error) {
          console.log(error);
          
            if (attempt === maxRetries || !error.code || error.code !== 'ECONNRESET') {
                throw error; // Throw if max retries reached or not ECONNRESET
            }
            console.warn(`Retrying request (${attempt}/${maxRetries}) due to ${error.code}`);
            
            await new Promise(resolve => setTimeout(resolve, delay * attempt)); // Exponential backoff
            console.log(delay*attempt);
            
        }
    }
};

// Test endpoint for TMDB now_playing movies
app.get('/test', async (req, res) => {
    try {
        // Validate query parameters
        const language = req.query.language || 'en-US';
        const page = parseInt(req.query.page, 10) || 1;
        if (page < 1 || page > 1000) {
            return res.status(400).json({ error: 'Page must be between 1 and 1000' });
        }

        const options = {
            method: 'GET',
            url: '/movie/now_playing',
            params: {
                language,
                page
            },
            headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`
            }
        };

        const response = await retryRequest(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('TMDB Proxy Error:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            data: error.response?.data
        });

        if (error.code === 'ECONNRESET') {
            res.status(502).json({ error: 'Connection reset by TMDB server' });
        } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
            res.status(504).json({ error: 'Request to TMDB server timed out' });
        } else if (error.response) {
            // Handle TMDB-specific errors (e.g., 401, 404)
            res.status(error.response.status).json({
                error: error.response.data.status_message || 'TMDB API error'
            });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Proxy server running on port ${port}`);
});
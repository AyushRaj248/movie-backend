require('dotenv').config();
const express = require('express');
const cors = require('cors');
const showRouter = require("./src/routes/shows.route")
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
        inflate: true,
        limit: "1mb",
        parameterLimit: 5000,
        type: "application/x-www-form-urlencoded",
    })
);


app.use("/",showRouter)
























// Test endpoint for TMDB now_playing movies
// app.get('/:show/:category', async (req, res) => {
//     try {
//         // Validate query parameters
//         const language = req.query.language || 'en-US';
//         const page = parseInt(req.query.page, 10) || 1;
//         if (page < 1 || page > 1000) {
//             return res.status(400).json({ error: 'Page must be between 1 and 1000' });
//         }

//         const options = {
//             method: 'GET',
//             url: '/movie/now_playing',
//             params: {
//                 language,
//                 page
//             },

//         };

//         const response = await retryRequest(options);
//         res.status(200).json(response.data);
//     } catch (error) {
//         console.error('TMDB Proxy Error:', {
//             message: error.message,
//             code: error.code,
//             status: error.response?.status,
//             data: error.response?.data
//         });

//         if (error.code === 'ECONNRESET') {
//             res.status(502).json({ error: 'Connection reset by TMDB server' });
//         } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
//             res.status(504).json({ error: 'Request to TMDB server timed out' });
//         } else if (error.response) {
//             // Handle TMDB-specific errors (e.g., 401, 404)
//             res.status(error.response.status).json({
//                 error: error.response.data.status_message || 'TMDB API error'
//             });
//         } else {
//             res.status(500).json({ error: 'Internal server error' });
//         }
//     }
// });

// Start the server


app.listen(port, () => {
    console.log(`Proxy server running on port ${port}`);
});
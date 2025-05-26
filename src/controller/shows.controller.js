const retryRequest = require("../utils/retryRequest")

const getShowsList = async (req, res) => {
    try {

        const { title, type } = req.params
        const config = {
            method: 'GET',
            url: `/${type}/${title}`
        }
        const response = await retryRequest(config);
        res.send(response.data)

    } catch (error) {
        console.log(error);

    }
}


const getNowPlaying = async (req, res) => {
    try {
        const config = {
            method: 'GET',
            url: "/movie/now_playing"
        }
        const response = await retryRequest(config);
        res.send(response.data)
    } catch (error) {
        console.log(error);

    }
}


const getMovieTrailer = async (req, res) => {

    try {
        const { id } = req.params
        const config = {
            method: 'GET',
            url: `/movie/${id}/videos`
        }
        const response = await retryRequest(config);
        res.send(response.data)
    } catch (error) {
        console.log(error);

    }
}

const getCategoryShowList = async (req, res) => {
    try {
        const { page } = req.query;
        const { type, category } = req.params
        const config = {
            method: 'GET',
            url: `/${type}/${category}`,
            params: {
                page: page
            }
        }
        const response = await retryRequest(config);
        res.send(response.data)
    } catch (error) {
        console.log(error);

    }
}

const getSingleShowDetail = async (req, res) => {
    try {
        const { type, movieId } = req.params;
        const config = {
            method: "GET",
            url: `/${type}/${movieId}`
        }
        const response = await retryRequest(config);
        res.send(response.data)
    } catch (error) {

    }
}

module.exports = { getShowsList, getMovieTrailer, getNowPlaying, getCategoryShowList, getSingleShowDetail }
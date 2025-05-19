const axiosInstance = require("./axiosIntance.js")

const retryRequest = async (config, maxRetries = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await axiosInstance(config);
        } catch (error) {
          
            if (attempt === maxRetries || !error.code || error.code !== 'ECONNRESET') {
                throw error; // Throw if max retries reached or not ECONNRESET
            }
            console.warn(`Retrying request (${attempt}/${maxRetries}) due to ${error.code}`);
            
            await new Promise(resolve => setTimeout(resolve, delay * attempt)); // Exponential backoff
            
        }
    }
};

module.exports= retryRequest;
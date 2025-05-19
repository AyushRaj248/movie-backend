const retryRequest = require("../utils/retryRequest")

const getShowsList = async (req,res) => {
    try {

        const {title,type} = req.params
        console.log(title);
        const config = {
            method:'GET',
            url:`/${type}/${title}`
        }
        const response = await retryRequest(config);
        res.send(response.data)
        
    } catch (error) {
        console.log(error);
        
    }
}



module.exports={getShowsList}
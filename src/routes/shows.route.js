const express = require("express");
const router = express.Router();
const showsController = require("../controller/shows.controller.js")
//homepage trailer api      
router.route("/movie/now_playing").get(showsController.getNowPlaying);
router.route("/movie/:id/videos").get(showsController.getMovieTrailer);


router.route("/listOfShowCategory/:type/:category").get(showsController.getCategoryShowList);
router.route("/singleShowDetails/:type/:movieId").get(showsController.getSingleShowDetail);


router.route("/:type/:title").get(showsController.getShowsList);



module.exports= router;
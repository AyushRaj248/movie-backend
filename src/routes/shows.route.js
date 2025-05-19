const express = require("express");
const router = express.Router();
const showsController = require("../controller/shows.controller.js")

router.route("/:type/:title").get(showsController.getShowsList);


module.exports= router;
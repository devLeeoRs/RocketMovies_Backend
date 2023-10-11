const { Router } = require("express");
const MoviesController = require("../controllers/Movies.Controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const route = Router();

const moviesController = new MoviesController();

route.use(ensureAuthenticated);

route.get("/:id", moviesController.show);
route.get("/", moviesController.index);
route.post("/", moviesController.create);
route.delete("/:id", moviesController.delete);

module.exports = route;

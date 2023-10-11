const { Router } = require("express");
const TagsController = require("../controllers/Tags.Controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const route = Router();

const tagsController = new TagsController();

route.get("/", ensureAuthenticated, tagsController.index);

module.exports = route;

const { Router } = require("express");
const UserController = require("../controllers/Users.Controller");
const UserAvatarController = require("../controllers/UserAvatar.Controller");
const multer = require("multer");
const uploadConfig = require("../configs/uploads");

const upload = multer(uploadConfig.MULTER);
const route = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const userController = new UserController();
const userAvatarController = new UserAvatarController();

route.delete("/:id", ensureAuthenticated, userController.delete);
route.post("/", userController.create);
route.put("/", ensureAuthenticated, userController.update);
route.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = route;

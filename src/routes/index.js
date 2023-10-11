const { Router } = require("express");
const router = Router();

const userRouter = require("./users.router");
const moviesRouter = require("./movies.router");
const tagsRouter = require("./tags.router");
const sessionsRouter = require("./sessions.router");

router.use("/users", userRouter);
router.use("/sessions", sessionsRouter);
router.use("/movies", moviesRouter);
router.use("/tags", tagsRouter);

router.get("/test1", (request, response, next) => {
  // Este exemplo lança uma exceção AppError com status 400
  throw new AppError("Teste de erro 1", 400);
});

module.exports = router;

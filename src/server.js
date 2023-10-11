require("express-async-errors");

const express = require("express");
const dotEnv = require("dotenv");
const router = require("./routes/index");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/uploads");
const cors = require("cors");

const app = express();

app.use(cors());
dotEnv.config();

app.use(express.json());
app.use(router);

// Exception handling

app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "internal server error ",
  });
});

app.listen(process.env.PORT, () => {
  console.log("server is running 🚀");
});

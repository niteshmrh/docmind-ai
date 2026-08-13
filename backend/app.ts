// External Packages
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// Config
import env from "./config/env.js";
// Routes
import routes from "./app/Http/Routes/routes.js";
// Middlewares
import errorMiddleware from "./app/Http/Middlewares/error.middleware.js";
import { generalRateLimiter } from "./app/Http/Middlewares/rateLimit.middleware.js";
// Utils
import HTTP_STATUS from "./app/Utils/httpStatus.js";
import customResponse from "./app/Utils/customResponse.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(generalRateLimiter);
app.use(
  express.urlencoded({
    limit: "200mb",
    extended: true,
    parameterLimit: 1000000,
  }),
);

app.get("/healthz", (req, res) => {
  return customResponse.success(req, res, {
    statusCode: HTTP_STATUS.OK,
    message: "Server is running",
    result: {
      status: "UP",
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
    },
  });
});

app.use("/docmind-ai", routes);

// Always last
app.use(errorMiddleware);

const server = app.listen(env.PORT, () => {
  console.log(`${env.NODE_ENV} Server is running on port ${env.PORT}`);
});

process.on("unhandledRejection", (error: Error) => {
  console.log("Unhandled Rejection:", error);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (error: Error) => {
  console.log("Uncaught Exception:", error);
  console.log("Shutting down the server due to uncaught exception");
  server.close(() => {
    process.exit(1);
  });
});

app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  return customResponse.error(req, res, {
    statusCode: HTTP_STATUS.NOT_FOUND,
    message: "Route not found",
  });
});

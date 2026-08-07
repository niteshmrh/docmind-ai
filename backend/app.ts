import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import env from "./config/env.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ limit: '200mb', extended: true, parameterLimit: 1000000 }));

app.get("/healthz", (req, res, next, ) => {
  res.status(200).json({ 
    success: true, 
    message: "Server is healthy" 
  });
});

// app.use('/api/v1', routes);


const server = app.listen(env.PORT, () => {
  const address = server.address();
  console.log(`${env.NODE_ENV} Server is running on port ${env.PORT}`);
});


process.on("unhandledRejection", (error: Error) => {
  console.log("Unhandled Rejection:", error);
  console.log("Shutting down the server due to unhandled promise rejection");
});

process.on("uncaughtException", (error: Error) => {
  console.log("Uncaught Exception:", error);
  console.log("Shutting down the server due to uncaught exception");
});

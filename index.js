import express from "express";
import mongoose from "mongoose";
import { envs } from "./conifg/config.js";

const app = express();

const { MONGO_IP, MONGO_PORT, MONGO_PASSWORD, MONGO_USER, PORT } = envs;
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get("/", (req, res) => {
  res.send("<h2>Hi There!!!</h2>");
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import { AuthController } from "./auth";
import http from "http";

dotenv.config();

const app = express();
const port = process.env.PORT || 7654;

app.use(express.json());
app.use("/auth", AuthController);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default server;

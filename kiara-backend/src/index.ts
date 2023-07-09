import express from "express";
import dotenv from "dotenv";
import { AuthController } from "./auth";
import { ConversationController } from "./conversation";
import http from "http";

dotenv.config();

const app = express();
const port = process.env.PORT || 7654;

app.use(express.json());
app.use("/auth", AuthController);
app.use("/conversations", ConversationController);

const server = http.createServer(app);
server.listen(port);

export default server;

import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { UserRepository } from "./adapters/sqlite";
import { JWTAdapter } from "./adapters/jwt";
dotenv.config();

const app = express();
const port = process.env.PORT || 7654;
app.use(express.json());

const auth = new JWTAdapter(UserRepository);

const isAuthorized = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // get bearer token from header
  const authToken = req.headers.authorization?.split(" ")[1];
  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    await auth.verify(authToken);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await UserRepository.create({
    name,
    email,
    passwordHash,
  });
  const { authToken, refreshToken } = await auth.signIn(email, password);
  res.json({ user, authToken, refreshToken });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const { authToken, refreshToken } = await auth.signIn(email, password);
  res.json({ authToken, refreshToken });
});

app.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  const { authToken, refreshToken: newRefreshToken } = await auth.refresh(
    refreshToken
  );
  res.json({ authToken, refreshToken: newRefreshToken });
});

app.get("/me", isAuthorized, async (req, res) => {
  const authToken = req.headers.authorization?.split(" ")[1];
  const user = await auth.verify(authToken as string);
  res.json({ user });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

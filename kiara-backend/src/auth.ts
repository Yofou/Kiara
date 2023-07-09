import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { IUser } from "./ports/User.interface";
import { UserRepository } from "./adapters/sqlite";
import { JWTAdapter } from "./adapters/jwt";
import { z } from "zod";

dotenv.config();
const AuthController = express.Router();
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
    auth.verify(authToken);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

AuthController.post("/signup", async (req, res) => {
  const UserSchema = z.object({
    email: z.string().email().max(320),
    password: z.string().min(8).max(20),
    name: z.string().min(3).max(20),
    avatar: z.string().url(),
  });

  try {
    const user = UserSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const existingUser = await UserRepository.findByEmail(user.email).catch(
      () => undefined
    );

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = (await UserRepository.create({
      email: user.email as string & { _brand: "UserEmail" },
      name: user.name as string & { _brand: "UserName" },
      avatar: user.avatar as string & { _brand: "UserAvatar" },
      passwordHash: hashedPassword as string & { _brand: "UserPasswordHash" },
    })) satisfies IUser;
    const { authToken, refreshToken } = await auth.signIn(
      newUser.email,
      user.password
    );
    return res.json({ authToken, refreshToken });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

AuthController.post("/signin", async (req, res) => {
  const UserSchema = z.object({
    email: z.string().email().max(320),
    password: z.string().min(8).max(20),
  });

  try {
    const user = UserSchema.parse(req.body);
    const { authToken, refreshToken } = await auth.signIn(
      user.email,
      user.password
    );
    return res.json({ authToken, refreshToken });
  } catch (error) {
    return res.status(400).json(error);
  }
});

AuthController.post("/refresh", async (req, res) => {
  const RefreshSchema = z.object({
    refreshToken: z.string(),
  });

  try {
    const { refreshToken } = RefreshSchema.parse(req.body);
    const { authToken, refreshToken: newRefreshToken } = await auth.refresh(
      refreshToken
    );
    return res.json({ authToken, refreshToken: newRefreshToken });
  } catch (error) {
    //console.log(error);
    return res.status(400).json(error);
  }
});

AuthController.get("/me", isAuthorized, async (req, res) => {
  // get bearer token from header
  const authToken = req.headers.authorization?.split(" ")[1];
  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = auth.verify(authToken);
    delete (user as any).passwordHash;
    return res.json(user);
  } catch (error: any) {
    return res.status(400).json(error);
  }
});

AuthController.delete("/delete", isAuthorized, async (req, res) => {
  // get bearer token from header
  const authToken = req.headers.authorization?.split(" ")[1];
  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = auth.verify(authToken);
    await UserRepository.delete(user.id);
    return res.json({ message: "User deleted" });
  } catch (error: any) {
    return res.status(400).json(error);
  }
});

export { AuthController, isAuthorized, auth };

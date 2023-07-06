import { UserRepository, User } from "../../ports/User.interface";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

type LoginResponse = {
  authToken: string;
  refreshToken: string;
};
export class JWTAdapter {
  private UserRepository: UserRepository;

  constructor(UserRepository: UserRepository) {
    this.UserRepository = UserRepository;
  }

  async signIn(email: string, password: string): Promise<LoginResponse> {
    const user = await this.UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const authToken = jwt.sign(user, process.env.AUTH_TOKEN_SECRET as string, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      user,
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );
    return { authToken, refreshToken };
  }
  async refresh(refreshToken: string): Promise<LoginResponse> {
    // check if refresh token is valid
    const user = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as User;
    // if the token is valid, generate a new auth token and refresh token
    if (!user) {
      throw new Error("Invalid refresh token");
    }
    delete (user as any).iat;
    delete (user as any).exp;
    const authToken = jwt.sign(user, process.env.AUTH_TOKEN_SECRET as string, {
      expiresIn: "15m",
    });
    const newRefreshToken = jwt.sign(
      user,
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );
    return { authToken, refreshToken: newRefreshToken };
  }
  async verify(authToken: string): Promise<User> {
    const user = jwt.verify(
      authToken,
      process.env.AUTH_TOKEN_SECRET as string
    ) as User;
    if (!user) {
      throw new Error("Invalid auth token");
    }
    return user;
  }
}

import { IUserRepository, IUser } from "../../ports/User.interface";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

type LoginResponse = {
  authToken: string & { _brand: "authToken" };
  refreshToken: string & { _brand: "refreshToken" };
};
export class JWTAdapter {
  private UserRepository: IUserRepository;

  constructor(UserRepository: IUserRepository) {
    this.UserRepository = UserRepository;
  }

  async signIn(email: string, password: string): Promise<LoginResponse> {
    const user = await this.UserRepository.findByEmail(
      email as string & {
        _brand: "UserEmail";
      }
    );
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const authToken = jwt.sign(
      user,
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "15m",
      }
    ) as string & { _brand: "authToken" };
    const refreshToken = jwt.sign(
      user,
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    ) as string & { _brand: "refreshToken" };
    return { authToken, refreshToken };
  }
  async refresh(refreshToken: string): Promise<LoginResponse> {
    // check if refresh token is valid
    const user = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as IUser;
    // if the token is valid, generate a new auth token and refresh token
    if (!user) {
      throw new Error("Invalid refresh token");
    }
    delete (user as any).iat;
    delete (user as any).exp;
    const authToken = jwt.sign(
      user,
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "15m",
      }
    ) as string & { _brand: "authToken" };
    const newRefreshToken = jwt.sign(
      user,
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    ) as string & { _brand: "refreshToken" };
    return { authToken, refreshToken: newRefreshToken };
  }
  verify(authToken: string): IUser {
    const user = jwt.verify(
      authToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as IUser;
    if (!user) {
      throw new Error("Invalid auth token");
    }
    return user;
  }
}

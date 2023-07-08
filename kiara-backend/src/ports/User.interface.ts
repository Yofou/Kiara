type UserId = string & { _brand: "UserId" };
type UserName = string & { _brand: "UserName" };
type UserAvatar = string & { _brand: "UserAvatar" };
type UserEmail = string & { _brand: "UserEmail" };
type UserPasswordHash = string & { _brand: "UserPasswordHash" };
type UserCreatedAt = string & { _brand: "UserCreatedAt" };
type UserUpdatedAt = string & { _brand: "UserUpdatedAt" };
type UserIsVerfied = boolean & { _brand: "UserIsVerfied" };

export interface IUser {
  id: UserId;
  name: UserName;
  avatar: UserAvatar;
  email: UserEmail;
  passwordHash: UserPasswordHash;
  createdAt: UserCreatedAt;
  updatedAt: UserUpdatedAt;
  isVerified: UserIsVerfied;
}

export interface IUserRepository {
  create(
    user: Omit<IUser, "createdAt" | "updatedAt" | "isVerified" | "id">
  ): Promise<IUser>;
  update(
    id: UserId,
    user: Omit<IUser, "createdAt" | "updatedAt">
  ): Promise<IUser>;
  delete(id: UserId): Promise<void>;
  findById(id: UserId): Promise<IUser>;
  findByEmail(email: UserEmail): Promise<IUser>;
  findByName(name: UserName): Promise<IUser>;
  findAll(): Promise<IUser[]>;
}

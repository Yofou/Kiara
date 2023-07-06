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
  create(user: Partial<IUser>): Promise<IUser>;
  update(id: string, user: Partial<IUser>): Promise<IUser>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  findByName(name: string): Promise<IUser>;
  findAll(): Promise<IUser[]>;
}

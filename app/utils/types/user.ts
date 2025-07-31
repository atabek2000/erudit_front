export type UserAuth = {
  name?: string;
  email: string;
  password: string;
};

export type UserResponse = {
  user: UserAuth;
};

export type JwtPayloadType = {
  email: string;
  id: number;
};

export type AuthUserType = {
  email: string;
  name: string;
  id: number;
  password: string;
  permissions: string[];
};

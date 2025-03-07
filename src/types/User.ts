export interface TUser {
  email: string;
  exp: number;
  iat: number;
  name: string;
  role: "admin" | "user";
  _id: string;
}

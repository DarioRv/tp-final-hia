import { UserData } from "./user-data.interface";

export interface LoginResponse {
  usuario: UserData;
  token: string;
}

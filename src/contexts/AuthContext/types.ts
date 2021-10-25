export interface AuthContextProps {
  token: string | null;
  setToken: any;
}

export enum AuthKeys {
  AUTH_TOKEN = "AUTH_TOKEN",
}

import { createContext, useCallback, useContext, useState } from "react";
import { AuthContextProps, AuthKeys } from "./types";

const getToken = sessionStorage.getItem(AuthKeys.AUTH_TOKEN);

const AuthContext = createContext<AuthContextProps>({
  token: getToken,
  setToken: () => {},
});

export const AuthProvider = (props: any) => {
  const [token, setToken] = useState<string | null>(getToken);

  const processToken = useCallback((value: string | null) => {
    if (!value) {
      sessionStorage.removeItem(AuthKeys.AUTH_TOKEN);
    } else {
      sessionStorage.setItem(AuthKeys.AUTH_TOKEN, value);
    }
    setToken(value);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: processToken,
      }}
      {...props}
    />
  );
};
export const useAuth = () => useContext(AuthContext);

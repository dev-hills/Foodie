import { createContext, useState } from "react";
import { typeAuthContext } from "../utils/types";

const AuthContext = createContext<typeAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userId,
        setUserId,
        hasProfile,
        setHasProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

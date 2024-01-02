import { createContext, useState } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  userId: number | null;
  setUserId: (userId: number | null) => void;
  hasProfile: boolean;
  setHasProfile: (hasProfile: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

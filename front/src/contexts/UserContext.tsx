import React, { createContext, useState, useContext } from "react";

interface User {
  username: string;
}

interface UserContextValue {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
  updateUser: (username: string) => void; // Add the updateUser function
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUserContext = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (username: string) => {
    setUser({ username });
  };

  const value: UserContextValue = {
    user,
    login,
    logout,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

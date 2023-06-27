import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router";

export type UserData = {
  userId: string | null;
  username: string | null;
};

interface UserContextValue {
  user: UserData;
  logout: () => void;
  updateUser: (user: UserData) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUserContext = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  console.log(context.user);
  return context;
};

export const UserProvider: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData>({ userId: null, username: null });
  const navigate = useNavigate();

  const logout = () => {
    setUser({ userId: null, username: null });
    navigate("/login");
  };

  const updateUser = (user: UserData) => {
    const { userId, username } = user;
    console.log(user.username);
    setUser({ userId, username });
  };

  const value: UserContextValue = {
    user,
    logout,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

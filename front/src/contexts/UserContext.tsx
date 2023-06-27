import React, { createContext, useState, useContext, useEffect } from "react";
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
  return context;
};

export const UserProvider: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData>({ userId: null, username: null });
  const navigate = useNavigate();
  const localUser = localStorage.getItem("user");

  useEffect(() => {
    const userJson: UserData = localUser && JSON.parse(localUser);
    localUser && userJson.username;
    setUser(userJson);
  }, [localUser]);

  const logout = () => {
    setUser({ userId: null, username: null });
    navigate("/login");
  };

  const updateUser = (user: UserData) => {
    const { userId, username } = user;
    localStorage.setItem("user", JSON.stringify(user));
    setUser({ userId, username });
  };

  const value: UserContextValue = {
    user,
    logout,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

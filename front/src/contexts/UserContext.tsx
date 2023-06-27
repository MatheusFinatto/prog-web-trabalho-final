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

// Create the UserContext using the createContext function from React
const UserContext = createContext<UserContextValue | undefined>(undefined);

// Define a custom hook useUserContext to access the UserContext value
export const useUserContext = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Define the UserProvider component that provides user data and methods to update and logout the user
export const UserProvider: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData>({ userId: null, username: null });
  const navigate = useNavigate();

  // Read the user data from local storage and set it as the initial user state using useEffect
  const localUser = localStorage.getItem("user");
  useEffect(() => {
    const userJson: UserData = localUser && JSON.parse(localUser);
    localUser && userJson.username;
    setUser(userJson);
  }, [localUser]);

  // Define a logout function that clears the user data and navigates to the login page
  const logout = () => {
    setUser({ userId: null, username: null });
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Define an updateUser function that updates the user data in local storage and in the component's state
  const updateUser = (user: UserData) => {
    const { userId, username } = user;
    localStorage.setItem("user", JSON.stringify(user));
    setUser({ userId, username });
  };

  // Create the value object with the user, logout, and updateUser properties
  const value: UserContextValue = {
    user,
    logout,
    updateUser,
  };

  // Export the UserContext value to its children using the UserContext.Provider component
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

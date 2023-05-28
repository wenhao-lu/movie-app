import React, { createContext, useContext, useState } from "react";

// Create an AuthContext to hold the authentication state
const AuthContext = createContext();

// Create a wrapper component to provide the AuthContext to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Implement your login function
  const login = (email, password) => {
    // Perform login logic here (e.g., API call, validation, etc.)
    // If login is successful, set the authenticated user
    const authenticatedUser = { email };
    setUser(authenticatedUser);
  };

  // Implement your logout function
  const logout = () => {
    // Perform logout logic here (e.g., clear session, reset state, etc.)
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to easily access the AuthContext values
export const useAuth = () => useContext(AuthContext);

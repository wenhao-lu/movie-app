import React, { createContext, useContext, useState } from "react";

// AuthContext to hold the authentication state
const AuthContext = createContext();

// a component to provide the AuthContext to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // login function
  const login = (email, password) => {
    // Perform login logic here (e.g., API call, validation, etc.)
    // If login is successful, set the authenticated user
    const authenticatedUser = { email };
    setUser(authenticatedUser);
  };

  // logout function
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

// a hook to easily access the AuthContext values
export const useAuth = () => useContext(AuthContext);

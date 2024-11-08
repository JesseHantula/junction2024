// src/context/AuthContext.js

import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accountType, setAccountType] = useState(null); // 'User' or 'Company'
  const [userData, setUserData] = useState(null); // User or company data

  const login = (type, data) => {
    setAccountType(type);
    setUserData(data);
  };

  const logout = () => {
    setAccountType(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ accountType, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

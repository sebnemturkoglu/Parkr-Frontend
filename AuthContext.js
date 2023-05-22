import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { signUp, signIn } from "./actions/auth";
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      const savedToken = await SecureStore.getItemAsync('token');
      if (savedToken) {
        setToken(savedToken);
        setIsAuthenticated(true);
      }
      setLoading(false);
    }
    fetchToken();
  }, []);

  const register = async (email, password, phone, name) => {
    try {
      const { token } = await dispatch(
        signUp({ mail: email, password, phone, name, role: "USER" })
      );
      await SecureStore.setItemAsync('token', token);
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      const { token } = await dispatch(
        signIn({ mail: email, password })
      );
      await SecureStore.setItemAsync('token', token);
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    setToken(null);
    setIsAuthenticated(false);
  };

  const authContextValue = {
    token,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

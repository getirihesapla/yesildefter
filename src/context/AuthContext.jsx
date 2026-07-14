import React, { createContext, useState, useEffect, useContext } from 'react';
import { dbService } from '../services/db';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sayfa yüklendiğinde oturum kontrolü
  useEffect(() => {
    const savedUser = localStorage.getItem('saas_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { user } = await dbService.login(email, password);
      setCurrentUser(user);
      localStorage.setItem('saas_current_user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, companyName) => {
    setLoading(true);
    try {
      const { user } = await dbService.register(email, password, companyName);
      setCurrentUser(user);
      localStorage.setItem('saas_current_user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('saas_current_user');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

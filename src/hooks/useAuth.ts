"use client";

import { useState, createContext, useContext } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  company?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    // Return mock auth data for demo purposes
    const [user, setUser] = useState<User | null>(() => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('sap_dashboard_user');
        return storedUser ? JSON.parse(storedUser) : {
          id: '1',
          name: 'John Anderson',
          email: 'john.anderson@company.com',
          role: 'Business Manager',
          company: 'SAP Demo Corp'
        };
      }
      return {
        id: '1',
        name: 'John Anderson',
        email: 'john.anderson@company.com',
        role: 'Business Manager',
        company: 'SAP Demo Corp'
      };
    });

    const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, _password: string): Promise<boolean> => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login - any credentials work
      const demoUser: User = {
        id: '1',
        name: email.includes('admin') ? 'Admin User' : 'John Anderson',
        email: email,
        role: email.includes('admin') ? 'Administrator' : 'Business Manager',
        company: 'SAP Demo Corp'
      };

      setUser(demoUser);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('sap_dashboard_user', JSON.stringify(demoUser));
        localStorage.setItem('sap_dashboard_auth', 'true');
      }
      
      setIsLoading(false);
      return true;
    };

    const logout = () => {
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sap_dashboard_user');
        localStorage.removeItem('sap_dashboard_auth');
        window.location.href = '/login';
      }
    };

    const register = async (userData: RegisterData): Promise<boolean> => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: 'User',
        company: userData.company || 'Demo Company'
      };

      setUser(newUser);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('sap_dashboard_user', JSON.stringify(newUser));
        localStorage.setItem('sap_dashboard_auth', 'true');
      }
      
      setIsLoading(false);
      return true;
    };

    const isAuthenticated = user !== null;

    return {
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      register
    };
  }
  
  return context;
}
'use client';

import { createContext, useContext, useState, useEffect } from "react";

// Define the context type
interface ProAuthContextType {
  isProUser: boolean;
  apiKey: string | null;
  login: (key: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// Create the context with default values
const ProAuthContext = createContext<ProAuthContextType | undefined>(undefined);

// Custom hook to use the context
export const useProAuth = () => {
  const context = useContext(ProAuthContext);
  if (context === undefined) {
    throw new Error('useProAuth must be used within a ProAuthProvider');
  }
  return context;
};

export const ProAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isProUser, setIsProUser] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved auth state on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('dedevs-pro-api-key');
    if (savedApiKey) {
      validateApiKey(savedApiKey);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateApiKey = async (key: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Validate API key with your auth service
      const response = await fetch('/api/auth/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: key })
      });

      if (response.ok) {
        setApiKey(key);
        setIsProUser(true);
        localStorage.setItem('dedevs-pro-api-key', key);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.error('API key validation failed:', error);
      logout();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (key: string): Promise<boolean> => {
    return await validateApiKey(key);
  };

  const logout = () => {
    setApiKey(null);
    setIsProUser(false);
    localStorage.removeItem('dedevs-pro-api-key');
  };

  const value: ProAuthContextType = {
    isProUser,
    apiKey,
    login,
    logout,
    isLoading
  };

  return (
    <ProAuthContext.Provider value={value}>
      {children}
    </ProAuthContext.Provider>
  );
};
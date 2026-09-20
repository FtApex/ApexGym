"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { LoginResponse, User, UserRole } from '@apex/shared';
import { api, tokenStorage, setUnauthorizedHandler } from '../api/client';

interface AuthContextValue {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  /** True mientras se restaura la sesión desde el token guardado. */
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
  }, []);

  // Un 401 en cualquier petición cierra la sesión y devuelve al inicio.
  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
      router.push('/');
    });
    return () => setUnauthorizedHandler(null);
  }, [router]);

  // Restaura la sesión al cargar: si hay token, se valida contra el backend.
  useEffect(() => {
    if (!tokenStorage.get()) {
      setIsLoading(false);
      return;
    }
    api
      .get<User>('/auth/profile')
      .then(setUser)
      .catch(() => tokenStorage.clear())
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<User> => {
    const { accessToken, user: loggedUser } = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    tokenStorage.set(accessToken);
    setUser(loggedUser);
    return loggedUser;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isAuthenticated: user !== null,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}

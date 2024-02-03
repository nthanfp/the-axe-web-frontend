import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = (userToken) => {
    setToken(userToken);
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const getToken = () => {
    return token;
  };

  useEffect(() => {
    // Contoh: Menjalankan logika otentikasi ketika komponen dipasang
    // Misalnya, memanggil endpoint untuk memverifikasi token yang ada di local storage
    // Di sini, kita hanya mencetak token untuk keperluan demonstrasi.
    console.log('Token:', token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

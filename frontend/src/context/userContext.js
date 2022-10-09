import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getLoggedUser } from '../services/axios/user';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [ user, setUser ] = useState({ id: undefined, rol: undefined });

  if (!user.id) {
    getLoggedUser()
      .then(res => {
        setUser(prev => ({
          id: res.user,
          rol: res.rol
        }))
      })
      .catch(() => <Navigate to="/"/>)
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

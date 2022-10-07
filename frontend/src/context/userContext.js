import React, { useState } from 'react';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [ user, setUser ] = useState({ id: null, rol: null, setUser: null });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

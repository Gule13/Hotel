
import { createContext, useState } from 'react';

export const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => {
    setRefreshFlag(prev => !prev);
  };

  return (
    <RefreshContext.Provider value={{ refreshFlag, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

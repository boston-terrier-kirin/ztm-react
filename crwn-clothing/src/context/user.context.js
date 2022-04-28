import { createContext, useState } from 'react';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

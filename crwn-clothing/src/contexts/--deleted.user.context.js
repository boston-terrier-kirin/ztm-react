import { createContext, useEffect, useReducer } from 'react';
import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};

const initialState = {
  currentUser: null,
};

export const UserProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const { currentUser } = state;
  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((authState) => {
      setCurrentUser(authState);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

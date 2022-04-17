import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import useLocalStorage from '../framework/hooks/use-local-storage';
import { validateUser } from '../framework/rest-api/actions';
import http from '../framework/rest-api/http';

const initialState = {
  user: null,
  setUser: _user => {},
  loadStatus: true,
  setLoadStatus: _loadStatus => {},
  setToken: _token => {},
};

const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage('recipe-key', '');
  const [user, setUser] = useState(null);
  const [loadStatus, setLoadStatus] = useState(true);

  useEffect(() => {
    if (token) {
      http.defaults.headers.Authorization = `Bearer ${token}`;

      validateUser()
        .then(res => {
          const { user: currentUser, token: newToken } = res.data;
          http.defaults.headers.Authorization = `Bearer ${newToken}`;
          setToken(newToken);
          setUser(currentUser);
        })
        .catch(() => {
          http.defaults.headers.Authorization = undefined;
        })
        .finally(() => setLoadStatus(false));
    } else {
      setLoadStatus(false);
    }
  }, []);

  const values = useMemo(
    () => ({ user, setUser, loadStatus, setLoadStatus, setToken }),
    [user, loadStatus, setToken]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../routes';

const Context = createContext();

export const ContextProvider = ({ children }) => {
   const [isAuth, setIsAuth] = useState(false);
   const [username, setUsername] = useState(null);
   const history = useHistory();

   useEffect(() => {
      const user = window.localStorage.getItem('user');
      if (user) {
         setUsername(user);
         setIsAuth(true);
      }
   }, []);

   const logIn = (login) => {
      setIsAuth(true);
      setUsername(login);
      window.localStorage.setItem('user', login);
      history.push(routes.lessons);
   };

   const logout = () => {
      setIsAuth(false);
      setUsername(null);
      window.localStorage.clear();
      history.push(routes.login);
   };

   const values = { logIn, isAuth, username, logout };

   return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const useGlobalContext = () => useContext(Context);

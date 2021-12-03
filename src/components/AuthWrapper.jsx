import { useGlobalContext } from '../context/global';
import { Route, Redirect } from 'react-router';
import { routes } from '../routes';
const AuthWrapper = ({ children, ...rest }) => {
   const { isAuth } = useGlobalContext();
   return (
      <Route
         {...rest}
         render={() => {
            return isAuth ? children : <Redirect to={routes.login} />;
         }}
      ></Route>
   );
};
export default AuthWrapper;

import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './styles/main.scss';
import routes from './routes';

const HomePage = lazy(() => import('./pages/Home'));
const SignInPage = lazy(() => import('./pages/SignIn'));
const SignUpPage = lazy(() => import('./pages/SignUp'));

const App = () => (
   <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
         <Switch>
            <Route path={routes.home} component={HomePage} exact />
            <Route path={routes.signIn} component={SignInPage} />
            <Route path={routes.signUp} component={SignUpPage} />
         </Switch>
      </Suspense>
   </BrowserRouter>
);

export default App;

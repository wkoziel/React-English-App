import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { routes } from './routes';

const HomePage = lazy(() => import('./pages/Home'));
const SignInPage = lazy(() => import('./pages/SignIn'));
const SignUpPage = lazy(() => import('./pages/SignUp'));
const Lessons = lazy(() => import('./pages/Lessons'));
const Repeat = lazy(() => import('./pages/Repeat'));
const Profile = lazy(() => import('./pages/Profile'));

const App = () => (
   <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
         <Switch>
            <Route path={routes.home} component={HomePage} exact />
            <Route path={routes.signIn} component={SignInPage} />
            <Route path={routes.signUp} component={SignUpPage} />
            <Route path={routes.lessons} component={Lessons} />
            <Route path={routes.repeat} component={Repeat} />
            <Route path={routes.profile} component={Profile} />
         </Switch>
      </Suspense>
   </BrowserRouter>
);

export default App;

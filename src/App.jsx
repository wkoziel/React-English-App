import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import { GlobalStyle } from './style';
import Loading from './components/Loading';
import { ContextProvider } from './context/global';
import AuthWrapper from './components/AuthWrapper';

const HomePage = lazy(() => import('./pages/Home'));
const SignInPage = lazy(() => import('./pages/SignIn'));
const SignUpPage = lazy(() => import('./pages/SignUp'));
const Lessons = lazy(() => import('./pages/Lessons'));
const Repeat = lazy(() => import('./pages/Repeat'));
const Profile = lazy(() => import('./pages/Profile'));
const SingleLesson = lazy(() => import('./pages/SingleLesson'));
const Typing = lazy(() => import('./pages/TypingPage/TypingPage'));
const Quiz = lazy(() => import('./pages/Quiz/QuizPage'));
const Flashcards = lazy(() => import('./pages/Flashcards/FlashcardsPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

const App = () => (
   <BrowserRouter>
      <Suspense fallback={<Loading />}>
         <GlobalStyle />
         <ContextProvider>
            <Switch>
               <Route path={routes.home} component={HomePage} exact />
               <Route path={routes.signIn} component={SignInPage} />
               <Route path={routes.signUp} component={SignUpPage} />
               <AuthWrapper>
                  <Route path={routes.lessons} component={Lessons} />
                  <Route path={routes.repeat} component={Repeat} />
                  <Route path={routes.profile} component={Profile} />
                  <Route path={routes.singleLesson} component={SingleLesson} exact />
                  <Route path={routes.typing} component={Typing} />
                  <Route path={routes.quiz} component={Quiz} />
                  <Route path={routes.flashcards} component={Flashcards} />
               </AuthWrapper>
               <Route path="*" component={ErrorPage} />
            </Switch>
         </ContextProvider>
      </Suspense>
   </BrowserRouter>
);

export default App;

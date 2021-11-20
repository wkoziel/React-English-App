import React from 'react';
import { Redirect } from 'react-router';
import Navbar from '../components/Navbar';
import { routes } from '../routes';

const Home = () => {
   return (
      <>
         <Navbar active={0} />
         <Redirect to={routes.signIn} />
      </>
   );
};

export default Home;

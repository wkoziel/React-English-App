import React from 'react';
import { routes } from '../routes';
import { Redirect } from 'react-router';

const Home = () => {
   return <Redirect to={routes.lessons} />;
};

export default Home;

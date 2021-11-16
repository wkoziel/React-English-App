import React from 'react';
import { Redirect } from 'react-router';
import Navbar from '../components/Navbar';

const Home = () => {
   return (
      <>
         <Navbar active={0} />
         <Redirect to="/lessons" />
      </>
   );
};

export default Home;

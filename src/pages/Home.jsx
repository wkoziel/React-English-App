import React from 'react';
import Navbar from '../components/Navbar';
import { routes } from '../routes';

const Home = () => {
   return (
      <>
         <Navbar active={0} />
         <h1 style={{ textAlign: 'center', marginTop: '15rem' }}>Strona główna już wkrótce</h1>
      </>
   );
};

export default Home;

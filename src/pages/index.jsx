import React from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

const Home = () => {
   return (
      <>
         <Navbar active={0} />
      </>
   );
};

const Container = styled.div`
   height: 100vh;
`;

export default Home;

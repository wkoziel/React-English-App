import React from 'react';
import styled from 'styled-components';
import image from '../assets/error.svg';
import Navbar from '../components/Navbar';
import { colors } from '../style';

const ErrorPage = () => {
   return (
      <>
         <Navbar />
         <Style className="container">
            <img src={image} alt="" />
            <h1>
               Przepraszamy! <br />
               Taka strona nie istnieje.
            </h1>
         </Style>
      </>
   );
};

const Style = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   height: 90vh;
   gap: 2.5rem;

   img {
      width: 40%;
   }

   h1 {
      color: ${colors.gray2};
      text-align: center;
   }
`;

export default ErrorPage;

import React from 'react';
import arrow from '../assets/arrow-black.svg';
import { colors } from '../style';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const GoBack = ({ label = null, link = null }) => {
   const history = useHistory();
   return (
      <Button onClick={() => history.goBack()}>
         <img src={arrow} alt="Black arrow back" />
         <h4>{label}</h4>
      </Button>
   );
};

const Button = styled.button`
   border: none;
   background: none;
   cursor: pointer;
   display: flex;
   align-items: center;
   h4 {
      display: inline !important;
   }
   color: ${colors.gray4};
`;

export default GoBack;

import React from 'react';
import arrow from '../assets/arrow-black.svg';
import { colors } from '../style';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const GoBack = ({ label = null, link = null }) => {
   const history = useHistory();
   return (
      <Button onClick={() => history.goBack()}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={arrow} alt="Black arrow back" />
            <h3 style={{ color: colors.gray4 }}>{label}</h3>
         </div>
      </Button>
   );
};

const Button = styled.button`
   border: none;
   background: none;
   cursor: pointer;
`;

export default GoBack;

import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../assets/arrow-black.svg';
import { colors } from '../style';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const GoBack = ({ label = null, link = null }) => {
   const history = useHistory();
   return (
      // <Link to={link}>
      <Button onClick={() => history.goBack()}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={arrow} alt="Black arrow back" />
            <h3 style={{ color: colors.darkGray }}>{label}</h3>
         </div>
      </Button>
      // </Link>
   );
};

const Button = styled.button`
   border: none;
   background: none;
   cursor: pointer;
`;

export default GoBack;

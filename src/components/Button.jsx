import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../style';
import arrow from '../assets/arrow-green.svg';
import whitearrow from '../assets/arrow-white.svg';

const Button = ({ onClick = null, type = 'button', label = '', whiteArrow = false }) => {
   return (
      <StyledButton type={type} onClick={onClick}>
         <h1 style={{ fontWeight: 'normal' }}>{label}</h1>
         {whiteArrow ? <img src={whitearrow} alt="Arrow right" /> : <img src={arrow} alt="Arrow right" />}
      </StyledButton>
   );
};

const StyledButton = styled.button`
   display: block;
   position: relative;
   border: 3px solid ${colors.green};
   display: flex;
   font-family: ${fonts.nova};
   justify-content: space-between;
   align-items: center;
   background-color: ${colors.white};
   border-radius: 0.3rem;
   padding: 0.5rem;
   cursor: pointer;
   transition: 0.2s all;
   &:hover {
      transform: translateY(-2px);
   }
`;
export default Button;

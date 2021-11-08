import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../style';
import arrow from '../assets/arrow-green.svg';

const Button = ({ onClick = null, type = 'button', label = '', width = 200 }) => {
   return (
      <StyledButton type={type} onClick={onClick} style={{ width: width + 'px' }}>
         <h1 style={{ fontWeight: 'normal' }}>{label}</h1>
         <img src={arrow} alt="Arrow right" />
      </StyledButton>
   );
};

const StyledButton = styled.button`
   border: 1px solid ${colors.green};
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

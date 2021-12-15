import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../style';
import arrow from '../assets/arrow-green.svg';
import whitearrow from '../assets/arrow-white.svg';

const Button = ({
   onClick = null,
   type = 'button',
   styles = {},
   label = '',
   whiteArrow = false,
   noArrow = false,
   disabled = false,
}) => {
   return (
      <StyledButton type={type} onClick={onClick} style={styles} disabled={disabled}>
         <h4>{label}</h4>
         {!noArrow && (
            <>{whiteArrow ? <img src={whitearrow} alt="Arrow right" /> : <img src={arrow} alt="Arrow right" />}</>
         )}
      </StyledButton>
   );
};

const StyledButton = styled.button`
   display: flex;
   align-items: center;
   justify-content: space-between;
   border: 3px solid ${colors.green};
   color: ${colors.green};
   font-family: ${fonts.nova};
   background-color: ${colors.white};
   border-radius: 0.3rem;
   cursor: pointer;
   transition: 0.2s all;
   width: fit-content;
   padding: 0 1rem;
   h2 {
      font-weight: normal;
   }
   &:hover {
      transform: scale(1.01);
   }

   &:disabled {
      border: 3px solid ${colors.gray2};
      color: ${colors.gray2};
   }
`;
export default Button;

import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../style';

const LinkBtn = ({ icon = null, label = null, onClick = () => {} }) => {
   return (
      <Style type="button" onClick={onClick}>
         {icon && <img src={icon} alt="Icon" />}
         <p>{label}</p>
      </Style>
   );
};

const Style = styled.button`
   border: none;
   background: none;
   cursor: pointer;
   display: flex;
   align-items: center;
   p {
      color: ${colors.white};
      margin: 0;
      font-family: ${fonts.nova};
      font-weight: bold;
   }
`;

export default LinkBtn;

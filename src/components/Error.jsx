import React from 'react';
import styled from 'styled-components';
import { colors } from '../style';

const Error = ({ message = '' }) => {
   return <Style>{message}!</Style>;
};

const Style = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   background: ${colors.red};
   color: ${colors.white};
   height: 40px;
   border: 2px solid ${colors.white};
   outline: 3px solid ${colors.red};
   border-radius: 1px;
   opacity: 0.9;
`;

export default Error;

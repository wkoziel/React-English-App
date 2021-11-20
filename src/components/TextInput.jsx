import React from 'react';
import styled from 'styled-components';
import { colors } from '../style';

const TextInput = ({ type = 'text', label = '', placeholder = '' }) => {
   return (
      <Style>
         <label>{label}:</label>
         <input type={type} placeholder={placeholder}></input>
      </Style>
   );
};

const Style = styled.div`
   display: flex;
   flex-direction: column;
   label {
      color: ${colors.black};
      margin-bottom: 3px;
   }
   input {
      outline: none;
      background: none;
      width: 100%;
      border: 1px solid ${colors.gray2};
      border-radius: 5px;
      padding: 1rem;
   }
`;

export default TextInput;
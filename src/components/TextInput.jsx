import React from 'react';
import styled from 'styled-components';
import { colors } from '../style';
import clsx from 'clsx';

const TextInput = React.forwardRef(({ type = 'text', label = '', placeholder = '', name = '', error = null }, ref) => {
   return (
      <Style>
         <label className={clsx(error && 'error')}>{label}:</label>
         <input
            className={clsx(error && 'error')}
            {...ref(name, { required: true })}
            type={type}
            placeholder={placeholder}
         ></input>
         <span>{error}</span>
      </Style>
   );
});

const Style = styled.div`
   display: flex;
   flex-direction: column;
   position: relative;
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
   .error {
      border-color: red;
      color: red;
      &::placeholder {
         color: red;
      }
   }

   span {
      position: absolute;
      color: red;
      bottom: 2px;
      right: 10px;
      font-size: 0.75rem;
   }
`;

export default TextInput;

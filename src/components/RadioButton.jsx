import React from 'react';
import styled from 'styled-components';
import { colors } from '../style';

const RadioButton = React.forwardRef(({ label = null, name = null, value = null, id = null, checked = null }, ref) => {
   return (
      <Style>
         <input
            type="radio"
            {...ref(name, { required: true })}
            name={name}
            id={id}
            value={value}
            defaultChecked={checked}
         />
         <label htmlFor={id}>{label}</label>
      </Style>
   );
});

const Style = styled.div`
   display: flex;
   align-items: center;
   input[type='radio'] {
      -webkit-appearance: none;
      appearance: none;
      margin: 0 0.5rem 0 0.5rem;

      font: inherit;
      color: ${colors.green};
      width: 1.5em;
      height: 1.5em;
      border: 0.15em solid currentColor;
      border-radius: 50%;
      transform: translateY(-0.075em);
      cursor: pointer;

      display: grid;
      place-content: center;
   }

   input[type='radio']::before {
      content: '';
      width: 1.5em;
      height: 1.5em;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      background-color: ${colors.green};
   }

   input[type='radio']:checked::before {
      transform: scale(1);
   }
`;

export default RadioButton;

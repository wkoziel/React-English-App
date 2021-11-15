import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../style';

const RadioButtons = ({ options = null, label = null, selected = null, setSelected = null, onChange = null }) => {
   return (
      <Style>
         <div className="options">
            <h1>{label}</h1>
            {options.map((o, i) => (
               <div key={i} className="option">
                  <input type="radio" name={o} id={o} value={o} checked={selected === o} onChange={onChange} />
                  <label htmlFor={o}>{o}</label>
               </div>
            ))}
         </div>
      </Style>
   );
};

const Style = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 0.5rem;

   .options {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
   }

   .option {
      display: flex;
      gap: 0.75em;
      padding-left: 2rem;
      align-items: center;

      label {
         font-size: 1.5rem;
         font-weight: bold;
         color: ${colors.gray};
      }
   }

   input[type='radio'] {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;

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

export default RadioButtons;

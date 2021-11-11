import React from 'react';
import styled from 'styled-components';

const RadioButtons = ({ options = ['Polski', 'Angielski'], label = 'Pierwszy język:' }) => {
   return (
      <Style>
         <h2>{label}</h2>
         <form action="">
            {options.map((o, i) => (
               <>
                  <input type="radio" name={i} id={i} />
                  <label htmlFor={i}>{o}</label>
               </>
            ))}
         </form>
      </Style>
   );
};

const Style = styled.div``;

export default RadioButtons;

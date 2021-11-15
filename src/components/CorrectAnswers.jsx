import React from 'react';
import styled from 'styled-components';
import { colors } from '../style';

const CorrectAnswers = ({ correct = null, answers = null }) => {
   const dots = [];
   for (let i = 0; i < answers; i++) {
      if (i < correct) dots.push(<div key={i} className="full"></div>);
      else dots.push(<div key={i} className="circle"></div>);
   }
   return (
      <Style>
         {dots}
         <p>Opanowanie słówka</p>
      </Style>
   );
};

const Style = styled.div`
   display: flex;
   align-items: center;
   gap: 0.7rem;

   .circle {
      border: 1px solid ${colors.green};
      width: 20px;
      border-radius: 50%;
      height: 20px;
   }

   .full {
      border: 1px solid ${colors.green};
      background-color: ${colors.green};
      width: 20px;
      border-radius: 50%;
      height: 20px;
   }
`;
export default CorrectAnswers;

import React from 'react';
import styled from 'styled-components';
import { colors } from '../style';

const LessonTitle = ({ label = null }) => {
   return (
      <Style>
         <h5>{label}</h5>
      </Style>
   );
};

const Style = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   color: ${colors.gray4};
`;

export default LessonTitle;

import React from 'react';
import styled from 'styled-components';
import { colors } from '../style';

const LessonTitle = ({ label = null }) => {
   return (
      <Style>
         <h4>{label}</h4>
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

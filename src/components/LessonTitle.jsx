import React from 'react';
import { colors } from '../style';

const LessonTitle = ({ label = null }) => {
   return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
         <h3 style={{ color: colors.darkGray }}>{label}</h3>
      </div>
   );
};

export default LessonTitle;

import React from 'react';
import { colors } from '../style';

const LessonTitle = ({ label = null }) => {
   return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0 0' }}>
         <h3 style={{ color: colors.gray4 }}>{label}</h3>
      </div>
   );
};

export default LessonTitle;

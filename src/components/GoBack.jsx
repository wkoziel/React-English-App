import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../assets/arrow-black.svg';
import { colors } from '../style';

const GoBack = ({ label = null, link = null }) => {
   return (
      <Link to={link}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={arrow} alt="Black arrow back" />
            <h3 style={{ color: colors.darkGray }}>{label}</h3>
         </div>
      </Link>
   );
};

export default GoBack;

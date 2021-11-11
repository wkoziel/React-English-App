import React from 'react';
import Loader from 'react-loader-spinner';
import { colors } from '../style';

const Loading = () => {
   return (
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
         <Loader type="Bars" color={colors.green} height={70} width={70} />;
      </div>
   );
};

export default Loading;

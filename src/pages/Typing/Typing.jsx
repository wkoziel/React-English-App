import React, { useReducer } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Start from './subpages/Start';

const initialState = {
   step: 0,
};

const actions = {
   nextStep: 'nextStep',
};

const reducer = (state, action) => {
   switch (action.type) {
      case actions.nextStep:
         return { ...state, step: action.payload };
      default:
         throw Error('No matching action');
   }
};

const Typing = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const renderStep = (step) => {
      switch (step) {
         case 0:
            return <Start />;
         default:
            return <div>Error</div>;
      }
   };

   return (
      <>
         <Navbar active={1} />
         <Style>{renderStep(state.step)}</Style>
      </>
   );
};

const Style = styled.div``;

export default Typing;

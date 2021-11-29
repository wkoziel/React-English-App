import React, { useEffect, useReducer } from 'react';
import Navbar from '../../components/Navbar';
import Step2 from './subpages/Step2';
import Step1 from './subpages/Step1';
import Step3 from './subpages/Step3';
import { exampleWords } from '../../data/data';
import { AnimatePresence, motion } from 'framer-motion';
import transitions from '../../helpers/transitions';

const initialState = {
   step: 0,
};

const actions = {
   nextStep: 'nextStep',
   loadData: 'loadData',
   prepareData: 'prepareData',
};

const reducer = (state, action) => {
   switch (action.type) {
      case actions.nextStep:
         return { ...state, step: state.step + 1 };
      case actions.loadData:
         return { ...state, data: action.payload };
      case actions.prepareData:
         return { ...state, ...action.payload };
      default:
         throw Error('No matching action');
   }
};

const Typing = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      try {
         dispatch({ type: actions.loadData, payload: exampleWords });
      } catch (error) {}
   }, []);

   const submitStep1 = (data) => {
      if (data.selectedLanguage === 0) {
         const tempData = state.data.map((word, index) => ({
            id: index,
            display: word.english,
            type: word.polish,
            correct: 0,
            learned: false,
         }));
         dispatch({ type: actions.prepareData, payload: { data: tempData, selectedTimes: data.selectedTimes + 1 } });
      } else {
         const tempData = state.data.map((word, index) => ({
            id: index,
            display: word.polish,
            type: word.english,
            correct: 0,
            learned: false,
         }));
         dispatch({ type: actions.prepareData, payload: { data: tempData, selectedTimes: data.selectedTimes + 1 } });
      }
      dispatch({ type: actions.nextStep });
   };

   const nextStep = () => {
      dispatch({ type: actions.nextStep });
   };

   const renderStep = (step) => {
      switch (step) {
         case 0:
            return <Step1 onSubmit={submitStep1} />;
         case 1:
            return <Step2 data={state.data} times={state.selectedTimes} nextStep={nextStep} />;
         case 2:
            return <Step3 />;
         default:
            return <div>Nie ma takiej podstrony</div>;
      }
   };

   return (
      <>
         <Navbar active={1} />
         <AnimatePresence>
            <motion.div {...transitions.opacity}>{renderStep(state.step)}</motion.div>
         </AnimatePresence>
      </>
   );
};

export default Typing;

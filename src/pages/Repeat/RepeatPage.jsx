import React, { useReducer, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Step2 from './subpages/Step2';
import Step1 from './subpages/Step1';
import Step3 from './subpages/Step3';
import { AnimatePresence, motion } from 'framer-motion';
import { prepareLearnData } from '../../helpers';
import Loading from '../../components/Loading';
import { useGlobalContext } from '../../context/global';
import transitions from '../../helpers/transitions';
import { getLessonWords } from '../../api/api';

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
         return { ...state, ...action.payload, step: state.step + 1 };
      default:
         throw Error('No matching action');
   }
};

const TestPage = () => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const [isLoading, setIsLoading] = useState(false);
   const { username } = useGlobalContext();
   const [wordsQuantity, setWordsQuantity] = useState(0);
   const [stats, setStats] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getLessonWords(0);
            if (response.data) dispatch({ type: actions.loadData, payload: response.data });
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchData();
   }, []); //eslint-disable-line

   const submitResult = (data) => {
      setStats(data);
      dispatch({ type: actions.nextStep });
   };

   const submitStep = (selectedLanguage) => {
      if (Number.parseInt(selectedLanguage) === 1) {
         dispatch({
            type: actions.prepareData,
            payload: {
               data: prepareLearnData(state.data, true),
            },
         });
      } else
         dispatch({
            type: actions.prepareData,
            payload: {
               data: prepareLearnData(state.data, false),
            },
         });
   };

   const renderStep = (step) => {
      switch (step) {
         case 0:
            return (
               <motion.div {...transitions.opacity} key="step-1">
                  <Step1 setQuantity={setWordsQuantity} nextStep={submitStep} />
               </motion.div>
            );
         case 1:
            return (
               <motion.div {...transitions.opacity} key="step-2">
                  <Step2 data={state.data} submitResult={submitResult} />
               </motion.div>
            );
         case 2:
            return (
               <motion.div {...transitions.opacity} key="step-3">
                  <Step3 data={stats} />
               </motion.div>
            );
         default:
            return <div>Nie ma takiej podstrony</div>;
      }
   };

   return (
      <>
         <Navbar active={2} />
         {isLoading ? <Loading /> : <AnimatePresence>{renderStep(state.step)}</AnimatePresence>}
      </>
   );
};

export default TestPage;

import { AnimatePresence, motion } from 'framer-motion';
import React, { useReducer, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Step1 from './subpages/Step1';
import Step2 from './subpages/Step2';
import Step3 from './subpages/Step3';
import { useParams } from 'react-router';
import { addLearnedWords, getLessonWords } from '../../api/api';
import { prepareLearnData } from '../../helpers';
import Loading from '../../components/Loading';
import { useGlobalContext } from '../../context/global';
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
         return { ...state, step: action.payload };
      case actions.loadData:
         return { ...state, data: action.payload };
      case actions.prepareData:
         return { ...state, ...action.payload, step: 1 };

      default:
         throw Error('No matching action');
   }
};

const FlashcardsPage = () => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const [isLoading, setIsLoading] = useState(true);
   const { id } = useParams();
   const { username } = useGlobalContext();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getLessonWords(id);
            if (response.data) dispatch({ type: actions.loadData, payload: response.data });
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchData();
   }, []); //eslint-disable-line

   useEffect(() => {
      const submitWords = async () => {
         try {
            const response = await addLearnedWords({ login: username, word_ids: state.wordIDs });
            console.log(response.data);
         } catch (error) {
            console.log(error);
         }
      };
      if (state.step === 2) submitWords();
   }, [state.step]); //eslint-disable-line

   const nextStep = () => dispatch({ type: actions.nextStep, payload: 2 });

   const submitStep = (data) => {
      const wordIDs = state.data.map((w) => w.word_id);
      if (data.selectedLanguage === 0)
         dispatch({
            type: actions.prepareData,
            payload: { data: prepareLearnData(state.data, true), selectedTimes: data.selectedTimes + 1, wordIDs },
         });
      else
         dispatch({
            type: actions.prepareData,
            payload: {
               data: prepareLearnData(state.data, false),
               selectedTimes: data.selectedTimes + 1,
               selectedLanguage: data.selectedLanguage,
               wordIDs,
            },
         });
   };

   const renderStep = (step) => {
      switch (step) {
         case 0:
            return (
               <motion.div {...transitions.opacity} key="step-1">
                  <Step1 onSubmit={submitStep} />
               </motion.div>
            );
         case 1:
            return (
               <motion.div {...transitions.opacity} key="step-2">
                  <Step2
                     data={state.data}
                     nextStep={nextStep}
                     times={state.selectedTimes}
                     bothSides={state.selectedLanguage === 2}
                  />
               </motion.div>
            );
         case 2:
            return (
               <motion.div {...transitions.opacity} key="step-3">
                  <Step3 />;
               </motion.div>
            );

         default:
            return <div>Nie ma takiej podstrony</div>;
      }
   };

   return (
      <>
         <Navbar active={1} />
         {isLoading ? <Loading /> : <AnimatePresence>{renderStep(state.step)}</AnimatePresence>}
      </>
   );
};

export default FlashcardsPage;

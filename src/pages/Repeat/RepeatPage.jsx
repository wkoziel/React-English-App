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
import { getRepeatWords, getRepeatWordsCount, sendRepeatWords } from '../../api/api';
import { lessonWordsData } from '../../data/lessons';

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
   const { username } = useGlobalContext();
   const [wordsQuantity, setWordsQuantity] = useState(0);
   const [stats, setStats] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [repeatCount, setRepeatCount] = useState(0);

   useEffect(() => {
      const fetchData = async () => {
         try {
            getRepeatWordsCount(lessonWordsData);
            setRepeatCount(30);
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchData();
   }, []); //eslint-disable-line

   const submitResult = async (data) => {
      setStats(data);
      const word_ids = data.filter((w) => w.learned).map((w) => w.old_id);
      dispatch({ type: actions.nextStep });
      try {
         const response = await sendRepeatWords({ login: username, word_ids });
         if (response.data) console.log(response.data.status);
      } catch (error) {
         console.log(error);
      }
   };

   const submitStep = async (selectedLanguage) => {
      try {
         setIsLoading(true);
         const params = new URLSearchParams([
            ['login', username],
            ['n', wordsQuantity],
         ]);
         const response = lessonWordsData;
         if (response) {
            await dispatch({ type: actions.loadData, payload: response });
            if (Number.parseInt(selectedLanguage) === 1) {
               dispatch({
                  type: actions.prepareData,
                  payload: {
                     data: prepareLearnData(response, true),
                  },
               });
            } else
               dispatch({
                  type: actions.prepareData,
                  payload: {
                     data: prepareLearnData(response, false),
                  },
               });
         }
      } catch (error) {
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   const renderStep = (step) => {
      switch (step) {
         case 0:
            return (
               <motion.div {...transitions.opacity} key="step-1">
                  <Step1 setQuantity={setWordsQuantity} nextStep={submitStep} words={repeatCount} />
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

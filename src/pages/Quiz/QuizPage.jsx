import React, { useReducer, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Step1 from './subpages/Step1';
import Step2 from './subpages/Step2';
import Step3 from './subpages/Step3';
import { prepareLearnData } from '../../helpers';
import { useParams } from 'react-router';
import { getLessonWords, addLearnedWords } from '../../api/api';
import { AnimatePresence } from 'framer-motion';
import Loading from '../../components/Loading';
import { useGlobalContext } from '../../context/global';

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

const Quiz = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [state, dispatch] = useReducer(reducer, initialState);
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
            // FIXME: Do usunięcia
            console.log(response.data);
         } catch (error) {
            console.log(error);
         }
      };
      if (state.step === 2) submitWords();
   }, [state.step]); //eslint-disable-line

   const nextStep = () => {
      dispatch({ type: actions.nextStep });
   };

   const submitStep = (data) => {
      //FIXME: Do usuniecia
      console.log('sumbit', data);
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
            return <Step1 onSubmit={submitStep} />;
         case 1:
            return <Step2 data={state.data} nextStep={nextStep} times={state.selectedTimes} />;
         case 2:
            return <Step3 />;
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

export default Quiz;

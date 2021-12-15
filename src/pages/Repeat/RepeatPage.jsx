import React, { useReducer, useState } from 'react';
import Navbar from '../../components/Navbar';
// import Step2 from './subpages/Step2';
import Step1 from './subpages/Step1';
// import Step3 from './subpages/Step3';
import { AnimatePresence, motion } from 'framer-motion';
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
   const [stats, setStats] = useState({});
   const { username } = useGlobalContext();

   // useEffect(() => {
   //    const fetchData = async () => {
   //       try {
   //          const response = await getLessonWords(id);
   //          if (response.data) dispatch({ type: actions.loadData, payload: response.data });
   //       } catch (error) {
   //          console.error(error);
   //       } finally {
   //          setIsLoading(false);
   //       }
   //    };
   //    fetchData();
   // }, []); //eslint-disable-line

   const submitStep = (data) => {
      dispatch({
         type: actions.prepareData,
         payload: {
            data: prepareLearnData(state.data, false),
            selectedTimes: 1,
            selectedLanguage: 1,
         },
      });
   };

   const renderStep = (step) => {
      switch (step) {
         case 0:
            return (
               <motion.div {...transitions.opacity} key="step-1">
                  <Step1 />
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

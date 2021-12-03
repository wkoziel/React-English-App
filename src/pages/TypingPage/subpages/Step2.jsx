import { motion } from 'framer-motion';
import styled from 'styled-components';
import Typing from '../../../components/Typing';
import transitions from '../../../helpers/transitions';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import CorrectAnswers from '../../../components/CorrectAnswers';
import { routes } from '../../../routes';
import { useState } from 'react';

const Step2 = ({ times = null, data = null, nextStep = null }) => {
   const [correct, setCorrect] = useState(0);
   return (
      <motion.div {...transitions.opacity} key="typing-2">
         <Style className="container page">
            <div className="Back">
               <GoBack label="Powrót do lekcji" link={routes.lessons} />
            </div>
            <div className="Top">
               <CorrectAnswers correct={correct?.correct} answers={times} />
            </div>
            <div className="Title">
               <LessonTitle label="1. Greetings" />
            </div>
            <div className="Main box">
               <Typing times={times} words={data} nextStep={nextStep} correct={correct} setCorrect={setCorrect} />
            </div>
         </Style>
      </motion.div>
   );
};

const Style = styled.div`
   display: grid;
   grid-template-columns: repeat(12, 1fr);
   grid-template-rows: 0.1fr auto;
   gap: 1rem 1rem;
   height: 85vh;

   .Back,
   .Title {
      grid-column: span 2;
      display: flex;
      margin: auto;
   }

   .Top {
      grid-column: span 8;
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .Main {
      grid-column: span 12;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
   }
`;

export default Step2;

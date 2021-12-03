import styled from 'styled-components';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import { routes } from '../../../routes';
import Flashcards from '../../../components/Flashcards';
import { motion } from 'framer-motion';
import transitions from '../../../helpers/transitions';
import CorrectAnswers from '../../../components/CorrectAnswers';
import { useState } from 'react';
import { colors } from '../../../style';

const Step2 = ({ data = null, nextStep = null, bothSides = null, times = null }) => {
   const [stats, setStats] = useState({ wordsLearned: 0, wordsLeft: 0, word: {} });
   return (
      <Style className="container page">
         <div className="Back">
            <GoBack label="Powrót do lekcji" link={routes.lessons} />
         </div>
         <div className="Top">
            <div className="box">
               <h4>
                  <span className="green">{stats?.wordsLearned} </span>
                  Nauczonych
               </h4>
               <h4>
                  <span className="yellow">{stats?.wordsLeft} </span>
                  Do nauczenia
               </h4>
               <CorrectAnswers correct={stats?.word?.correct} answers={times} />
            </div>
         </div>
         <div className="Title">
            <LessonTitle label="1. Greetings" />
         </div>
         <motion.div {...transitions.opacity} className="Main">
            <Flashcards
               times={times}
               words={data}
               nextStep={nextStep}
               bothSides={bothSides}
               setStats={setStats}
               stats={stats}
            />
         </motion.div>
      </Style>
   );
};

const Style = styled.div`
   display: grid;
   grid-template-columns: repeat(12, 1fr);
   grid-template-rows: 0.1fr auto;
   gap: 1rem 1rem;

   align-items: center;
   .Back,
   .Title {
      grid-column: span 2;
      display: flex;
      margin: auto;
   }

   .Top {
      grid-column: span 8;
      & > div {
         display: flex;
         align-items: center;
         justify-content: space-around;

         h4 {
            font-weight: normal;
            color: ${colors.gray2};
            margin: 7px;

            span {
               font-weight: bold;
               font-size: 1.9rem;
            }
         }
      }
   }

   .Main {
      grid-column: span 12;
   }
`;

export default Step2;

import styled from 'styled-components';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import { routes } from '../../../routes';
import Flashcards from '../../../components/Flashcards';
import { motion } from 'framer-motion';
import transitions from '../../../helpers/transitions';

const Step2 = ({ data = null, nextStep = null, bothSides = null }) => {
   return (
      <Style className="container page">
         <div className="Back">
            <GoBack label="Powrót do lekcji" link={routes.lessons} />
         </div>
         <div className="Top"></div>
         <div className="Title">
            <LessonTitle label="1. Greetings" />
         </div>
         <div className="Top"></div>
         <motion.div {...transitions.opacity} className="Main">
            <Flashcards data={data} nextStep={nextStep} bothSides={bothSides} />
         </motion.div>
      </Style>
   );
};

const Style = styled.div`
   display: grid;
   grid-template-columns: repeat(12, 1fr);
   grid-template-rows: 0.3fr auto;
   gap: 1rem 1rem;
   .Back,
   .Title {
      grid-column: span 2;
      display: flex;
      margin: auto;
   }

   .Top {
      grid-column: span 8;
   }

   .Main {
      grid-column: span 12;
   }
`;

export default Step2;

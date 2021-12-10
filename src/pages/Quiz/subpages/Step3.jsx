import styled from 'styled-components';
import Congratulations from '../../../components/Congratulations';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import { routes } from '../../../routes';
import { motion } from 'framer-motion';
import transitions from '../../../helpers/transitions';

const Step3 = () => {
   return (
      <motion.div {...transitions.opacity}>
         <Style className="container page">
            <div className="Back">
               <GoBack label="Powrót do lekcji" link={routes.lessons} />
            </div>
            <div className="Top" />
            <div className="Title">
               <LessonTitle label="Quiz" />
            </div>
            <motion.div {...transitions.opacity} className="Main">
               <Congratulations />
            </motion.div>
         </Style>
      </motion.div>
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

export default Step3;

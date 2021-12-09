import { motion } from 'framer-motion';
import styled from 'styled-components';
import Congratulations from '../../../components/Congratulations';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import transitions from '../../../helpers/transitions';
import { routes } from '../../../routes';

const Step3 = ({ data = null }) => {
   return (
      <motion.div {...transitions.opacity} key="typing-3">
         <Style>
            <div className="container">
               <div className="Back">
                  <GoBack label="Powrót do lekcji" link={routes.lessons} />
               </div>
               <div className="Title">
                  <LessonTitle label="1. Greetings" />
               </div>
               <div className="Top"></div>
               <div className="Main">
                  <Congratulations test correct={data.correctAnswers} total={data.total} percentage={data.percentage} />
               </div>
            </div>
         </Style>
      </motion.div>
   );
};

const Style = styled.div`
   .container {
      display: grid;
      grid-template-columns: 0.4fr 2.2fr 0.4fr;
      grid-template-rows: 0.3fr 1.8fr;
      gap: 1rem 0px;
      grid-auto-flow: row;
      align-items: center;
      justify-content: center;
      grid-template-areas:
         'Back Top Title'
         'Main Main Main';
   }

   .Back {
      grid-area: Back;
   }

   .Title {
      grid-area: Title;
   }

   .Top {
      grid-area: Top;
   }

   .Main {
      grid-area: Main;
   }
`;

export default Step3;

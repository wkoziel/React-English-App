import styled from 'styled-components';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import { routes } from '../../../routes';
import Quiz from '../../../components/Quiz';

const Step2 = ({ data = null, nextStep = null, times = null }) => {
   return (
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
               <Quiz data={data} nextStep={nextStep} times={times} />
            </div>
         </div>
      </Style>
   );
};

const Style = styled.div`
   height: 100%;
   .container {
      height: 100%;
      display: grid;
      grid-template-columns: 0.4fr 2.2fr 0.4fr;
      grid-template-rows: 0.3fr 0.6fr;
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
      height: 100%;
   }
`;

export default Step2;

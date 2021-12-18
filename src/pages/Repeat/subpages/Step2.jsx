import styled from 'styled-components';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import { routes } from '../../../routes';
import Quiz from '../../../components/Quiz';
import { useState } from 'react';

const Step2 = ({ data = null, submitResult = null, times = 1 }) => {
   const [correct, setCorrect] = useState(0);
   return (
      <Style className="container page">
         <div className="Back">
            <GoBack label="Powrót do lekcji" link={routes.lessons} />
         </div>
         <div className="Top"></div>
         <div className="Title">
            <LessonTitle label="Powtórka" />
         </div>
         <div className="Main">
            <Quiz words={data} submitResult={submitResult} times={times} correct={correct} setCorrect={setCorrect} />
         </div>
      </Style>
   );
};

const Style = styled.div`
   display: grid;
   grid-template-columns: repeat(12, 1fr);
   grid-template-rows: 0.1fr auto;
   gap: 1rem 1rem;
   height: 90vh;

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

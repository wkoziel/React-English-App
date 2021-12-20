import React from 'react';
import styled from 'styled-components';
import image from '../assets/congratulations.svg';
import Button from './Button';
import { colors } from '../style';
import { useHistory, useLocation } from 'react-router';
import CountUp from 'react-countup';
import { routes } from '../routes';

const Congratulations = ({ test = false, correct = null, total = null, percentage = null }) => {
   const loc = useLocation();
   const history = useHistory();
   return (
      <Style>
         <div className="circle">
            <h1 className="text-3 pulse">
               <CountUp end={test ? percentage : 100} duration={2} />%
            </h1>
         </div>
         {test ? (
            <div className="stats-box white-box">
               <h1>Gratulacje!</h1>
               <div className="stats">
                  <h2 className="green">
                     <CountUp end={correct} duration={1} />
                  </h2>
                  <p>Poprawnych odpowiedzi</p>
                  <h2 className="red">
                     <CountUp end={total - correct} duration={1} />
                  </h2>
                  <p>Błędnych odpowiedzi</p>
                  <h2 className="purple">
                     <CountUp end={total} duration={1} />
                  </h2>
                  <p>Wszystkich słówek</p>
               </div>
            </div>
         ) : (
            <div className="grid white-box">
               <div className="pulse">
                  <h1>Gratulacje!</h1>
                  <h4>Udało ci się zakończyć naukę!</h4>
               </div>
               <img src={image} alt="Kobieta" />
            </div>
         )}

         <div className="buttons">
            {!test && <Button label="Powtórz naukę!" noArrow onClick={() => history.go(loc.pathname)} />}
            {test && <Button label="Wszysktie lekcje" noArrow onClick={() => history.push(routes.lessons)} />}
            <Button label="Powrót do lekcji" noArrow onClick={() => history.goBack()} />
         </div>
      </Style>
   );
};

const Style = styled.div`
   position: relative;
   .circle {
      position: absolute;
      background-color: ${colors.white};
      border: 1.5rem solid ${colors.green};
      width: 200px;
      height: 200px;
      left: 50%;
      top: 5%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${colors.green};
   }
   .grid {
      height: 65vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;

      & > div {
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;

         h1 {
            font-size: 5.5rem;
         }
      }
   }

   .buttons {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
   }

   button {
      width: fit-content;
   }

   button:last-child {
      background-color: ${colors.green};
      color: ${colors.white};
   }

   .stats-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 7rem;
      height: 60vh;
      gap: 2rem;
      h1 {
         font-size: 5.5rem;
      }
   }
   .stats {
      display: grid;
      align-items: center;
      grid-template-columns: auto 150px auto 150px auto 150px;

      h2 {
         font-size: 3.5rem;
      }
      p {
         margin: 0;
      }
   }
`;
export default Congratulations;

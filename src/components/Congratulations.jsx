import React from 'react';
import styled from 'styled-components';
import image from '../assets/congratulations.svg';
import Button from './Button';
import { colors } from '../style';
import { useHistory, useLocation } from 'react-router';

const Congratulations = () => {
   const loc = useLocation();
   const history = useHistory();
   return (
      <Style>
         <div className="circle">
            <h1 className="text-3">100%</h1>
         </div>
         <div className="grid white-box">
            <div>
               <h1>Gratulacje!</h1>
               <h4>Udało ci się zakończyć naukę!</h4>
            </div>
            <img src={image} alt="Kobieta" />
         </div>
         <div className="buttons">
            <Button label="Powtórz naukę!" noArrow onClick={() => history.go(loc.pathname)} />
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
`;
export default Congratulations;

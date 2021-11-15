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
            <div className="flex-center">
               <h1 className="text-5">Gratulacje!</h1>
               <h2 className="text-15">Udało ci się zakończyć naukę!</h2>
            </div>
            <div className="flex-center" style={{ justifySelf: 'end' }}>
               <img src={image} alt="Kobieta" />
            </div>
         </div>
         <div className="grid buttons">
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
      display: grid;
      grid-template-columns: 1fr 1fr;
      img {
         height: 100%;
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

import React from 'react';
import Navbar from '../components/Navbar';
import image from '../assets/lessons.svg';
import Button from '../components/Button';
import styled from 'styled-components';
import { colors } from '../style';

const Lessons = () => {
   return (
      <>
         <Navbar active={1} />
         <Style className="container">
            {/* BOX 1 */}
            <div className="box box-1">
               <h2 className="top">Osiągnij swój wyznaczony cel!</h2>
               <img src={image} alt="Kobieta z notatkami" />
               <h2 className="bottom">Pozostało 25 słówek do opanowania</h2>
            </div>

            {/* BOX 2 */}
            <div className="box box-1">
               <h2>Kontynuuj naukę</h2>
               {/* TODO: Label w buttonie wzlędem ostaniej lekcji */}
               <div className="circle"></div>
               <Button label="Lekcja 24" />
            </div>

            {/* BOX 3 */}
            <div className="lessons">
               <h1>Wszystkie lekcje</h1>
            </div>
         </Style>
      </>
   );
};

const Style = styled.div`
   display: flex;
   flex-direction: column;
   gap: 0.5rem;

   @media screen and (min-width: 600px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      .box-1 {
         display: grid;
         grid-template-columns: 5fr 2.5fr;
         grid-template-rows: 1fr auto 1fr;
         max-height: 200px;

         .top {
            margin-top: 1rem;
            align-self: start;
         }
         .bottom {
            grid-row-start: 3;
            align-self: end;
            margin-bottom: 1rem;
         }
         img {
            grid-row: span 3;
            align-self: center;
         }
      }
   }

   .lessons {
      grid-column: 1 / span 2;
      margin-top: 1.5rem;
   }

   .circle {
      border-radius: 50%;
      border: 0.4rem solid ${colors.green};
      height: 10em;
      width: 10em;
   }
`;

export default Lessons;

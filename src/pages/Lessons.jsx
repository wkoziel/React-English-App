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
            <div className="top-row">
               {/* BOX 1 */}
               <div className="box" style={{ display: 'flex', width: '50%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                     <h2>Osiągnij swój wyznaczony cel!</h2>
                     <h2>Pozostało 25 słówek do opanowania</h2>
                  </div>
                  <img src={image} alt="Kobieta z notatkami" />
               </div>

               {/* BOX 2 */}
               <div className="box" style={{ display: 'flex', width: '50%' }}>
                  <div style={{ display: 'flex', justifyItems: 'space-between' }}>
                     <div>
                        <h2>Kontynuuj naukę</h2>
                        {/* TODO: Label w buttonie wzlędem ostaniej lekcji */}
                        <Button label="Lekcja 24" />
                     </div>
                     <div className="circle"></div>
                  </div>
               </div>
            </div>
            <div></div>
         </Style>
      </>
   );
};

const Style = styled.div`
   .top-row {
      display: flex;
      height: 30%;
      gap: 2rem;
   }
   .circle {
      border-radius: 50%;
      border: 0.4rem solid ${colors.green};
      height: 100px;
      width: 100px;
   }
`;

export default Lessons;

import React from 'react';
import Navbar from '../components/Navbar';
import image from '../assets/lessons.svg';
import Button from '../components/Button';
import styled from 'styled-components';
import { colors } from '../style';
import { lessons } from '../data/data';
import { Link } from 'react-router-dom';
import arrow from '../assets/arrow-green.svg';

const Lessons = () => {
   return (
      <>
         <Navbar active={1} />
         <Style className="container">
            {/* BOX 1 */}
            <div className="box box-1">
               <h2 className="top cel">Osiągnij swój wyznaczony cel!</h2>
               <img className="right" src={image} alt="Kobieta z notatkami" />
               <h2 className="bottom slowka">
                  Pozostało <span>25</span> słówek do opanowania
               </h2>
            </div>

            {/* BOX 2 */}
            <div className="box box-1 padding">
               <h2 className="top nauka">Kontynuuj naukę</h2>
               {/* TODO: Label w buttonie wzlędem ostaniej lekcji */}
               <div className="right circle">
                  <h1 className="procent">25%</h1>
               </div>
               <div className="bottom button">
                  <Button label="Lekcja 24" />
               </div>
            </div>

            {/* BOX 3 */}
            <div className="box-3">
               <h1>Wszystkie lekcje</h1>
               <div className="lessons">
                  {lessons.map((l, i) => (
                     <Link to={`/lesson/${i}`}>
                        <div className="lesson">
                           <h2>{i}.</h2>
                           <div className="title">
                              <h2>{l.lesson_name}</h2>
                              <h4>25 pojęć</h4> {/*Kolumna z ilością pojęć*/}
                           </div>
                           <h2 className="perc">100%</h2> {/*Kolumna z procentami*/}
                           <img src={arrow} alt="Arrow right" />
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </Style>
      </>
   );
};

const Style = styled.div`
   display: grid;
   gap: 0.5rem;

   @media screen and (min-width: 600px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
   }

   .box-1 {
      display: grid;
      grid-template-columns: 5fr 2.5fr;
      grid-template-rows: 1fr auto 1fr;
      max-height: 200px;
      overflow: hidden;

      .top {
         margin-top: 1rem;
         align-self: start;
      }
      .bottom {
         grid-row-start: 3;
         align-self: end;
         margin-bottom: 1rem;
      }
      .right {
         grid-row: span 3;
         align-self: center;
      }
   }

   // BOX 1
   .cel {
      font-size: 1.75em;
      color: ${colors.green};
   }

   .slowka {
      font-size: 1.9em;
      color: ${colors.gray4};
      span {
         color: ${colors.green};
      }
   }

   // BOX 2
   .nauka {
      font-size: 1.9rem;
   }

   .button {
      button {
         width: 300px !important;
         height: 70px !important;
      }
   }

   .padding {
      padding: 1rem 2rem 1rem 3rem;
   }

   .circle {
      border-radius: 50%;
      border: 0.4rem solid ${colors.green};
      height: 10em;
      width: 10em;
      align-self: center;
      justify-self: center;

      display: flex;
      align-items: center;
      justify-content: center;

      h1 {
         font-size: 2.75rem;
      }
   }

   // BOX 3
   .box-3 {
      grid-column: 1 / span 2;
      margin-top: 1.5rem;

      .lessons {
         margin-top: 1.5rem;

         display: flex;
         flex-direction: column;
         gap: 1rem;
      }

      .lesson {
         width: 100%;
         background-color: ${colors.white};
         height: 80px;
         border-radius: 10px;
         border: 3px solid rgba(0, 0, 0, 0.05);
         display: grid;
         grid-template-columns: 40px auto auto 50px;
         align-items: center;
         padding: 0 2rem;

         h2 {
            text-transform: capitalize;
            justify-self: start;
         }

         .perc {
            justify-self: end;
         }

         img {
            justify-self: end;
         }
      }
   }
`;

export default Lessons;

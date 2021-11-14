import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import GoBack from '../components/GoBack';
import LessonTitle from '../components/LessonTitle';
import Navbar from '../components/Navbar';
import { routes } from '../routes';
import { colors } from '../style';
import bird from '../assets/bird.svg';
import Button from '../components/Button';

const SingleLesson = () => {
   const { id } = useParams();
   return (
      <>
         <Navbar active={1} />
         <Style className="container">
            <div className="Top">
               <div className="words">
                  <span>25</span>
                  <h3>Nowych pojęć</h3>
               </div>
               <div className="percent">
                  <span>15%</span>
                  <h3>Poziom opanowania</h3>
               </div>
            </div>
            <div className="Back">
               <GoBack label=" Powrót do lekcji" link={routes.lessons} />
            </div>
            <div className="Lesson">
               <LessonTitle label="1. Greetings" /> {/*Do podmiany*/}
            </div>
            <div className="Card">
               <h1>
                  Lekcja 1 <span>Greetings</span>
               </h1>
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fringilla dignissim posuere. Praesent
                  id vulputate neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                  turpis egestas. Sed sed ultricies libero. Nunc sed aliquam magna. Praesent dapibus ullamcorper ex ut
                  viverra. Nulla mattis, nulla a dictum laoreet, augue nibh iaculis lorem, sit amet ullamcorper metus
                  elit eget dolor. Aenean lacinia orci id mollis vestibulum.{' '}
               </p>
               <img src={bird} alt="" />
            </div>
            <div className="Nauka">
               <h2>Wybierz sposób nauki:</h2>
               <Button label="Fiszki" />
               <Button label="Wpisywanie" />
               <Button label="Quiz" />
            </div>
            <div className="Test">
               <h2>Rozpocznij test umiejętności:</h2>
               <Button label="Rozpocznij test" whiteArrow />
            </div>
         </Style>
      </>
   );
};

const Style = styled.div`
   display: grid;

   @media screen and (min-width: 600px) {
      display: grid;
      grid-template-columns: 0.4fr 1.4fr 0.4fr 0.4fr;
      grid-template-rows: 0.6fr 4fr 2fr;
      gap: 2rem 2rem;
      grid-auto-flow: row;
      grid-template-areas:
         'Back Top Top Lesson'
         'Card Card Nauka Nauka'
         'Card Card Test Test';
      align-items: stretch;
      justify-content: center;
   }

   .Top {
      grid-area: Top;
      background-color: ${colors.white};
      width: 80%;
      justify-self: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      padding: 0 3rem;
      border-radius: 20px;

      .words,
      .percent {
         display: flex;
         align-items: center;

         h3 {
            font-weight: normal;
            font-size: 1.5rem;
         }
         span {
            font-size: 2rem;
            margin-right: 1rem;
            font-weight: bold;
         }
      }

      .words span {
         color: ${colors.green};
      }

      .percent span {
         color: ${colors.purple};
      }
   }

   .Back {
      grid-area: Back;
      align-self: center;
      justify-self: center;
   }

   .Lesson {
      grid-area: Lesson;
      align-self: center;
      justify-self: center;
   }

   .Card {
      grid-area: Card;
      width: 100%;
      background-color: ${colors.white};
      border-radius: 20px;
      padding: 0 3rem;
      position: relative;

      display: grid;
      grid-template-rows: 1fr 5fr;

      h1 {
         justify-self: center;
         align-self: center;

         span {
            margin-left: 1.5rem;
            color: ${colors.green};
         }
      }

      p {
         font-size: 1.5em;
         align-self: start;
         justify-self: center;
      }

      img {
         position: absolute;
         bottom: 0;
         right: 3rem;
      }
   }

   .Nauka {
      grid-area: Nauka;
      background-color: ${colors.white};
      border-radius: 20px;
      padding: 1rem 2rem;

      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      justify-self: stretch h2 {
         margin-bottom: 1rem;
      }

      button {
         width: 100%;
         padding: 1rem;
      }
   }

   .Test {
      grid-area: Test;
      background-color: ${colors.white};
      border-radius: 20px;

      padding: 1rem 2rem;

      h2 {
         margin-bottom: 1rem;
      }

      button {
         width: 100%;
         padding: 1rem;
         background-color: ${colors.green};
         color: ${colors.white};
      }
   }
`;

export default SingleLesson;

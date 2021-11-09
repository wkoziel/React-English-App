import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import GoBack from '../components/GoBack';
import LessonTitle from '../components/LessonTitle';
import Navbar from '../components/Navbar';
import { routes } from '../routes';
import { colors } from '../style';
import bird from '../assets/bird.svg';

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
            <div className="Nauka">Wybór lekcji</div>
            <div className="Test">Test</div>
         </Style>
      </>
   );
};

const Style = styled.div`
   width: 100vw;
   display: grid;

   @media screen and (min-width: 600px) {
      display: grid;
      grid-template-columns: 0.4fr 1.4fr 0.4fr 0.4fr;
      grid-template-rows: 0.6fr 1.7fr 0.7fr;
      gap: 2rem 0px;
      grid-auto-flow: row;
      grid-template-areas:
         'Back Top Top Lesson'
         'Card Card Nauka Nauka'
         'Card Card Test Test';
      align-items: center;
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
   }

   .Lesson {
      grid-area: Lesson;
   }

   .Card {
      grid-area: Card;
      width: 100%;
      background-color: ${colors.white};
      border-radius: 20px;
      padding: 0 3rem;
      align-self: stretch;
      span {
         color: ${colors.green};
      }
   }

   .Nauka {
      grid-area: Nauka;
   }

   .Test {
      grid-area: Test;
   }
`;

export default SingleLesson;

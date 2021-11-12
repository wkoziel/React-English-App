import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import { colors } from '../../../style';

const tempData = [
   {
      english: 'dog',
      lesson_id: 3,
      polish: 'pies',
      word_id: 4,
   },
   {
      english: 'cat',
      lesson_id: 3,
      polish: 'kot',
      word_id: 5,
   },
   {
      english: 'duck',
      lesson_id: 3,
      polish: 'kaczka',
      word_id: 6,
   },
];

const Main = ({ language = null, times = null }) => {
   const [words, setWords] = useState([]);
   const [selectedWord, setSelectedWord] = useState(0);

   useEffect(() => {
      if (language === 0) {
         setWords(tempData.map((word) => ({ display: word.english, type: word.polish })));
      } else {
         setWords(tempData.map((word) => ({ display: word.polish, type: word.english })));
      }
   }, [language]);

   return (
      <Style>
         <div className="container">
            <div className="Back">
               <GoBack label="Powrót do lekcji" link="/" />
            </div>
            <div className="Title">
               <LessonTitle label="1. Greetings" />
            </div>
            <div className="Top"></div>
            <div className="Main">
               <div className="subcontainer">
                  <div className="Good">
                     <h2>3</h2>
                     <div className="good"></div>
                  </div>
                  <div className="Wrong">
                     <h2>3</h2>
                     <div className="bad"></div>
                  </div>
                  <div className="Questions">
                     <h1>Pytanie 2 / 25</h1>
                  </div>
                  <div className="Word">
                     <h1>Word</h1>
                  </div>
                  <div className="Input">
                     <input type="text" placeholder="Twoja definicja" />
                     <p>Wpisz definicje</p>
                  </div>
               </div>
            </div>
         </div>
      </Style>
   );
};

const Style = styled.div`
   overflow-y: hidden;
   .container {
      display: grid;
      grid-template-columns: 0.4fr 2.2fr 0.4fr;
      grid-template-rows: 0.3fr 1.8fr;
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
      padding: 1rem 2rem;
      background-color: ${colors.white};
      border-radius: 20px;

      .subcontainer {
         display: grid;
         grid-template-columns: 0.5fr 2.1fr 0.4fr;
         grid-template-rows: 0.4fr 4fr 0.6fr;
         gap: 0px 0px;
         grid-auto-flow: row;
         align-items: center;
         justify-content: center;
         grid-template-areas:
            'Good Questions Wrong'
            'Word Word Word'
            'Input Input Input';
      }

      .Good {
         grid-area: Good;
         display: flex;
         align-items: center;
         gap: 1rem;
         color: ${colors.green};

         .good {
            width: 70px;
            height: 20px;
            border-radius: 10px;
            background-color: ${colors.green};
         }
      }

      .Wrong {
         grid-area: Wrong;
         display: flex;
         align-items: center;
         justify-content: end;
         gap: 1rem;
         color: ${colors.red};

         .bad {
            width: 70px;
            height: 20px;
            border-radius: 10px;
            background-color: ${colors.red};
         }
      }

      .Questions {
         grid-area: Questions;
         text-align: center;
         color: ${colors.green};

         padding-top: 1.5rem;
      }

      .Word {
         grid-area: Word;
         display: flex;
         align-items: center;
         justify-content: center;
         text-align: center;

         font-size: 2rem;
      }

      .Input {
         grid-area: Input;
         justify-self: stretch;
         border: 3px solid ${colors.lightGray};
         padding: 1rem 2.5rem 2rem;
         border-radius: 10px;
         position: relative;

         display: flex;
         justify-content: stretch;

         input {
            width: 100%;
            border: none;
            outline: none;
            border-bottom: 2px solid ${colors.gray};
            padding-left: 1rem;
            font-size: 1.9rem;
            font-weight: 500;

            &::placeholder {
               color: ${colors.gray};
            }
         }

         p {
            position: absolute;
            bottom: 1rem;
            left: 2.75rem;
            color: ${colors.gray};
         }
      }
   }
`;

export default Main;

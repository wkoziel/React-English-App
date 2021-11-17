import React, { useState, useReducer, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../style';
import correct from '../assets/correct.svg';
import wrong from '../assets/wrong-small.svg';
import { shuffle } from '../helpers';

const initialState = {
   words: [],
   word: {},
   good: 0,
   wrong: 0,
};

const actions = {
   updateState: 'updateState',
};

const reducer = (state, action) => {
   switch (action.type) {
      case actions.updateState:
         return { ...state, ...action.payload };
      default:
         return new Error('No matching action');
   }
};
const Flashcards = ({ data = null, times = 0, nextStep = null, bothSides = null }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const [showAnswers, setShowAnswers] = useState(false);
   const ref = useRef();

   useEffect(() => {
      const firstWord = data[0];
      dispatch({ type: actions.updateState, payload: { words: data, word: firstWord } });
   }, []);

   const handleButtonClick = (isCorrect, single = true) => {
      let tempWords,
         good = state.good,
         wrong = state.wrong;

      if (single) ref.current.style.color = colors.white;

      if (isCorrect) {
         good = good + 1;
         if (state.word.correct < times)
            tempWords = state.words.map((word) =>
               word.id === state.word.id ? { ...word, correct: word.correct + 1 } : word,
            );
         else tempWords = state.words.map((word) => (word.id === state.word.id ? { ...word, learned: true } : word));
      } else {
         tempWords = state.words;
         wrong = wrong + 1;
      }

      let nextWord = state.words.find((word) => word.id > state.word.id && state.word.learned === false);
      if (nextWord === undefined) nextWord = state.words.find((word) => word.learned === false);

      if (nextWord === undefined) nextStep();
      else {
         dispatch({ type: actions.updateState, payload: { words: tempWords, word: nextWord, good, wrong } });
         if (single) setTimeout(() => (ref.current.style.color = colors.black), 1000);
      }
   };

   return (
      <>
         {bothSides ? (
            <Style>
               <div className={`both side`}>
                  <button type="button" onClick={() => handleButtonClick(false, false)}>
                     <img src={wrong} alt="" />
                  </button>
                  <div>
                     <h1>{state?.word?.display}</h1>
                     <hr />
                     <h1>{state?.word?.type}</h1>
                  </div>
                  <button type="button" onClick={() => handleButtonClick(true, false)}>
                     <img src={correct} alt="" />
                  </button>
               </div>
            </Style>
         ) : (
            <Style onClick={() => setShowAnswers(!showAnswers)}>
               <div className={`side front-side ${showAnswers && 'front-flipped'}`}>
                  <h1>{state?.word?.display}</h1>
                  <p>Kliknij aby zobaczyć definicje..</p>
               </div>
               <div className={`side back-side ${showAnswers && 'back-flipped'} `}>
                  <button type="button" onClick={() => handleButtonClick(false)}>
                     <img src={wrong} alt="" />
                  </button>
                  <h1 ref={ref}>{state?.word?.type}</h1>
                  <button type="button" onClick={() => handleButtonClick(true)}>
                     <img src={correct} alt="" />
                  </button>
               </div>
            </Style>
         )}
      </>
   );
};

const Style = styled.button`
   perspective: 150rem;
   height: 70vh;
   width: 100%;
   position: relative;

   border: none;
   outline: none;
   background: none;

   .both {
      display: grid;
      grid-template-columns: 0.5fr 1fr 0.5fr;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      hr {
         border: 1px solid ${colors.lightGray};
         width: 100%;
      }

      h1:nth-child(3) {
         color: ${colors.gray};
      }

      img {
         width: 100px;
      }
   }

   button {
      border: none;
      outline: none;
      background: none;
      cursor: pointer;
   }

   h1 {
      font-size: 8rem;
   }

   .side {
      height: 75vh;
      width: 100%;
      padding: 0.75rem;
      border: 3px solid lightgray;
      border-radius: 20px;
      background: ${colors.white};

      position: absolute;
      top: 0;
      left: 0;

      backface-visibility: hidden;
      transition: all 0.5s;

      p {
         position: absolute;
         bottom: 1rem;
         font-weight: bold;
         font-size: 1rem;
         color: ${colors.gray};
      }
   }

   .front-side {
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .back-side {
      transform: rotateX(180deg);
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      padding: 1rem 4rem;
      transition: all 0.8;

      img {
         opacity: 0.7;
         &:hover {
            transform: scale(1.02);
            opacity: 0.8;
         }
      }

      img:first-child {
         width: 100px;
      }
      img:first-child {
         width: 120px;
      }
   }

   .front-flipped {
      transform: rotateX(-180deg);
   }

   .back-flipped {
      transform: rotateX(0);
   }
`;

export default Flashcards;

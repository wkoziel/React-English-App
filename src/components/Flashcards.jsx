import React, { useState, useReducer, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { colors } from '../style';
import correct from '../assets/correct.svg';
import wrong from '../assets/wrong-small.svg';

const initialState = {
   words: [],
   word: {},
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
const Flashcards = ({ words = null, times = 0, nextStep = null, bothSides = null, setStats = null, stats = null }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const [showAnswers, setShowAnswers] = useState(false);
   const ref = useRef();

   useEffect(() => {
      dispatch({ type: actions.updateState, payload: { words, word: words[0] } });
      setStats({ wordsLeft: words.length, wordsLearned: 0, word: words[0] });
   }, []); // eslint-disable-line

   const handleButtonClick = (isCorrect, single = true) => {
      let tempWords,
         wordsLearned = stats.wordsLearned,
         wordsLeft = stats.wordsLeft;
      if (single && ref?.current?.style) ref.current.style.color = colors.white;
      if (isCorrect) {
         if (state.word.correct + 1 < times)
            tempWords = state.words.map((word) =>
               word.id === state.word.id ? { ...word, correct: word.correct + 1 } : word,
            );
         else {
            tempWords = state.words.map((word) => (word.id === state.word.id ? { ...word, learned: true } : word));
            wordsLearned += 1;
            wordsLeft -= 1;
         }
      } else {
         tempWords = state.words;
      }

      const checkIfEnd = state.words.reduce((total, item) => {
         if (item.learned) total += 1;
         return total;
      }, 0);
      if (checkIfEnd === state.words.length) nextStep();

      let nextWord = state.words.find((word) => word.id > state.word.id && state.word.learned === false);
      if (nextWord === undefined) nextWord = state.words.find((word) => word.learned === false);
      if (nextWord === undefined || nextWord === state.word) nextStep();
      else {
         setStats({ ...stats, word: nextWord, wordsLearned, wordsLeft });
         dispatch({ type: actions.updateState, payload: { words: tempWords, word: nextWord } });
         if (single && ref?.current?.style) setTimeout(() => (ref.current.style.color = colors.black), 500);
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
                     <h1 className="green">{state?.word?.type}</h1>
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
   width: 100%;
   position: relative;
   border: none;
   outline: none;
   background: none;
   margin: 0;
   height: 75vh;

   .both {
      display: grid;
      grid-template-columns: 0.5fr 1fr 0.5fr;
      align-items: center;
      justify-content: center;

      hr {
         border-bottom: 3px solid ${colors.gray1};
         border-top: none;
         width: 100%;
         margin: 1rem 0;
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
      font-size: 5vw;
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
      transition: all 0.4s;

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
      padding: 1rem 5rem;
      color: ${colors.green};

      img {
         opacity: 0.7;
         &:hover {
            transform: scale(1.1);
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

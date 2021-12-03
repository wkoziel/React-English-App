import React, { useState, useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../style';
import correct from '../assets/correct-small.png';
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
const Quiz = ({ words = null, times = 0, nextStep = null, setCorrect = null }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const [displayedWords, setDisplayedWords] = useState([]);
   const [showAnswers, setShowAnswers] = useState(false);

   useEffect(() => {
      dispatch({ type: actions.updateState, payload: { words, word: words[0] } });
   }, []); //eslint-disable-line

   useEffect(() => {
      if (!!state.words.length) {
         let randomWords = [];
         while (randomWords.length < 3) {
            const random = Math.floor(Math.random() * (state.words.length - 0)) + 0;
            if (state.words[random] !== state.word && !randomWords.includes(state.words[random]))
               randomWords.push(state.words[random]);
         }
         randomWords.push(state.word);
         randomWords = shuffle(randomWords);
         setDisplayedWords(randomWords);
      }
   }, [state]);

   useEffect(() => {
      const checkIfEnd = state.words.reduce((total, item) => {
         if (item.learned) total += 1;
         return total;
      }, 0);
      if (checkIfEnd === state.words.length && !!state.words.length) nextStep();
   }, [state]);

   const checkAnswer = (answer) => {
      let tempWords,
         good = state.good,
         wrong = state.wrong;

      setShowAnswers(true);
      if (state.word.type === answer) {
         good = good + 1;
         if (state.word.correct + 1 < times)
            tempWords = state.words.map((word) =>
               word.id === state.word.id ? { ...word, correct: word.correct + 1 } : word,
            );
         else tempWords = state.words.map((word) => (word.id === state.word.id ? { ...word, learned: true } : word));
      } else {
         tempWords = state.words;
         wrong = wrong + 1;
      }

      let nextWord = state.words.find((word) => word.id > state.word.id && state.word.learned === false);
      if (nextWord === undefined || nextWord === state.word)
         nextWord = state.words.find((word) => word.learned === false);

      setTimeout(() => {
         dispatch({
            type: actions.updateState,
            payload: { words: tempWords, word: nextWord, good, wrong },
         });
         setCorrect(nextWord);
         setShowAnswers(false);
      }, 2000);
   };

   useEffect(() => {
      generateButtons();
   }, [state]); //eslint-disable-line

   const generateButtons = () => {
      if (showAnswers) {
         return displayedWords.map((word, index) => (
            <button
               type="button"
               className={`option ${word.type === state.word?.type ? 'goodAnswer' : 'wrongAnswer'}`}
               key={index}
               onClick={() => checkAnswer(word?.type)}
               disabled={showAnswers}
            >
               <h2>{word?.type}</h2>
               {word.type === state.word?.type ? <img src={correct} alt="" /> : <img src={wrong} alt="" />}
            </button>
         ));
      } else {
         return displayedWords.map((word, index) => (
            <button type="button" className="option" key={index} onClick={() => checkAnswer(word?.type)}>
               <h2>{word?.type}</h2>
            </button>
         ));
      }
   };

   return (
      <Style>
         <div className="quiz white-box">
            <div className="Good ">
               <h2>{state?.good}</h2>
               <div className="good"></div>
            </div>
            <div className="Wrong">
               <h2>{state?.wrong}</h2>
               <div className="bad"></div>
            </div>
            <h1>{state?.word?.display}</h1>
         </div>
         <div className="Input">{generateButtons()}</div>
      </Style>
   );
};

const Style = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;

   .quiz {
      border: 1px solid ${colors.gray2};
      position: relative;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40vh;
   }

   .Good {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: ${colors.green};
      position: absolute;
      left: 1rem;
      top: 0.5rem;
      .good {
         width: 70px;
         height: 20px;
         border-radius: 10px;
         background-color: ${colors.green};
      }
   }

   .Wrong {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 1rem;
      color: ${colors.red};
      position: absolute;
      right: 1rem;
      top: 0.5rem;
      .bad {
         width: 70px;
         height: 20px;
         border-radius: 10px;
         background-color: ${colors.red};
      }
   }

   .Questions {
   }

   .Input {
      grid-area: Input;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      align-items: center;
      justify-content: center;
      gap: 1rem 1rem;
      padding-top: 2rem;

      .option {
         background-color: ${colors.white};
         border: 1px solid ${colors.gray2};
         border-left: 10px solid ${colors.green};
         border-radius: 10px;
         padding: 1.5rem;
         cursor: pointer;
         transition: all 0.2s;
         display: flex;
         justify-content: space-between;
         align-items: center;
         h2 {
            font-size: 2.25rem;
            text-align: start;
            font-family: ${fonts.nova};
            font-weight: 500;
            text-transform: capitalize;
            color: ${colors.gray4};
         }

         &:hover {
            border-left: 20px solid ${colors.green};
         }
      }
   }
   .goodAnswer {
      border-left: none;
      border: 3px solid ${colors.green} !important;
      color: ${colors.gray4};
   }

   .wrongAnswer {
      border-left: none;
      border: 3px solid ${colors.red} !important;
      h2 {
         color: ${colors.gray1} !important;
      }
   }
`;

export default Quiz;

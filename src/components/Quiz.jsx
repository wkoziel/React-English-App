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
const Quiz = ({ data = null, times = 0, nextStep = null }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const [displayedWords, setDisplayedWords] = useState([]);
   const [showAnswers, setShowAnswers] = useState(false);

   useEffect(() => {
      const firstWord = data[0];
      dispatch({ type: actions.updateState, payload: { words: data, word: firstWord } });
   }, []);

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

   const checkAnswer = (answer) => {
      let tempWords,
         good = state.good,
         wrong = state.wrong;

      setShowAnswers(true);
      if (state.word.type === answer) {
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

      setTimeout(() => {
         if (nextWord === undefined) nextStep();
         console.log(nextWord);
         dispatch({ type: actions.updateState, payload: { words: tempWords, word: nextWord, good, wrong } });
         setShowAnswers(false);
      }, 2000);
   };

   useEffect(() => generateButtons(), [state]);

   const generateButtons = () => {
      if (showAnswers) {
         return displayedWords.map((word, index) => (
            <button
               type="button"
               className={`option ${word.type === state.word?.type ? 'goodAnswer' : 'wrongAnswer'}`}
               key={index}
               onClick={() => checkAnswer(word?.type)}
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
            <div className="Questions">
               <div className="circle">
                  <h1>15s</h1>
               </div>
            </div>
            <div className="Word">
               <h1>{state?.word?.display}</h1>
               <p>Wybierz poprawną definicje</p>
            </div>
         </div>
         <div className="Input">{generateButtons()}</div>
      </Style>
   );
};

const Style = styled.div`
   height: 70vh;
   .quiz {
      height: 60%;
      display: grid;
      grid-template-columns: 0.5fr 2.1fr 0.4fr;
      grid-template-rows: 0.1fr 1.9fr;
      grid-auto-flow: row;
      grid-template-areas:
         'Good Questions Wrong'
         'Word Word Word';
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
      position: relative;
      .circle {
         position: absolute;
         background-color: ${colors.white};
         border: 0.75rem solid ${colors.green};
         width: 120px;
         height: 120px;
         left: 50%;
         top: 10%;
         border-radius: 50%;
         transform: translate(-50%, -50%);
         display: flex;
         align-items: center;
         justify-content: center;
         color: ${colors.green};

         h1 {
            font-size: 2.5rem;
         }
      }
   }

   .Word {
      grid-area: Word;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      hr {
         border: 1px ${colors.lightGray} solid;
         width: 50%;
         margin: 0.5rem 0;
      }

      h1 {
         font-size: 8rem;
         align-self: center;
      }

      p {
         font-size: 1rem;
         color: ${colors.gray};
         position: absolute;
         bottom: 0;
      }
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
         border: 1px solid ${colors.lightGray};
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
         }

         &:hover {
            border-left: 20px solid ${colors.green};
         }
      }
   }
   .goodAnswer {
      border-left: none;
      border: 3px solid ${colors.green} !important;
   }

   .wrongAnswer {
      border-left: none;
      border: 3px solid ${colors.red} !important;
      color: ${colors.lightGray};
   }
`;

export default Quiz;

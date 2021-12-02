import { colors } from '../style';
import React, { useReducer, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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

const Typing = ({ times = null, words = null, nextStep = null, setCorrect = null }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const [input, setInput] = useState('');
   const [showAnswer, setShowAnswer] = useState(false);

   const inputBorderRef = useRef();

   useEffect(() => {
      dispatch({ type: actions.updateState, payload: { words, word: words[0] } });
   }, []); //eslint-disable-line

   const onKeyPressHandler = (e) => {
      if (e.code === 'Enter') checkInput();
   };

   const checkInput = () => {
      let tempWords,
         good = state.good,
         wrong = state.wrong;
      if (input.toLowerCase() === state.word.type) {
         inputBorderRef.current.style.borderColor = colors.green;
         good = good + 1;
         if (state.word.correct + 1 < times) {
            tempWords = state.words.map((word) =>
               word.id === state.word.id ? { ...word, correct: word.correct + 1 } : word,
            );
         } else {
            tempWords = state.words.map((word) => (word.id === state.word.id ? { ...word, learned: true } : word));
         }
      } else {
         inputBorderRef.current.style.borderColor = colors.red;
         tempWords = state.words;
         wrong = wrong + 1;
      }

      let nextWord = state.words.find((word) => word.id > state.word.id && state.word.learned === false);
      if (nextWord === undefined) {
         nextWord = state.words.find((word) => word.learned === false);
      }
      setShowAnswer(true);
      setTimeout(() => {
         if (nextWord === state.word) {
            nextStep();
         } else {
            dispatch({
               type: actions.updateState,
               payload: { words: tempWords, word: nextWord, good, wrong },
            });
            setInput('');
            setCorrect(nextWord);
            inputBorderRef.current.style.borderColor = colors.gray1;
            setShowAnswer(false);
         }
      }, 2000);
   };

   return (
      <Style>
         <div className="Good">
            <h2>{state?.good}</h2>
            <div className="good"></div>
         </div>
         <div className="Wrong">
            <h2>{state?.wrong}</h2>
            <div className="bad"></div>
         </div>
         <div className="Word">
            <h1>{state?.word?.display}</h1>
            {showAnswer && (
               <>
                  <hr />
                  <h1 className="green">{state?.word?.type}</h1>
               </>
            )}
         </div>
         <div className="Input" ref={inputBorderRef}>
            <input
               disabled={showAnswer}
               type="text"
               placeholder="Twoja definicja"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyPress={onKeyPressHandler}
            />
         </div>
      </Style>
   );
};

const Style = styled.div`
   grid-column: span 12;
   display: flex;
   flex-direction: column;
   align-items: center;
   position: relative;
   width: 100%;
   height: 100%;

   .Good {
      position: absolute;
      top: 0;
      left: 2rem;
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
      display: flex;
      align-items: center;
      justify-content: end;
      position: absolute;
      top: 0;
      right: 2rem;
      gap: 1rem;
      color: ${colors.red};
      .bad {
         width: 70px;
         height: 20px;
         border-radius: 10px;
         background-color: ${colors.red};
      }
   }

   .Word {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h1 {
         font-size: 4rem !important;
      }

      hr {
         border: 1px ${colors.gray1} solid;
         width: 100%;
      }
   }

   .Questions {
      text-align: center;
      color: ${colors.green};
      padding-top: 1.5rem;
   }

   .Input {
      width: 90%;
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
   }
`;

export default Typing;

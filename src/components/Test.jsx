import { colors } from '../style';
import React, { useReducer, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { shuffle } from '../helpers';

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

const Typing = ({ words = null, submitTest = null, defaultTime = 10 }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const [input, setInput] = useState('');
   const [correctAnswers, setCorrectAnswers] = useState(0);
   const [index, setIndex] = useState(1);
   const [time, setTime] = useState(defaultTime);

   const inputRef = useRef();

   useEffect(() => {
      const shuffledWords = shuffle(words);
      dispatch({ type: actions.updateState, payload: { words: shuffledWords, word: shuffledWords[0] } });
   }, []); //eslint-disable-line

   const onKeyPressHandler = (e) => {
      if (e.code === 'Enter') checkInput();
   };

   useEffect(() => {
      if (time < 1) {
         checkInput();
         setTime(defaultTime);
      }
      const timer = time > 0 && setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timer);
   }, [time]); //eslint-disable-line

   const checkInput = async () => {
      console.log(
         'TEST',
         ' typed: ',
         input.toLowerCase(),
         'correct: ',
         state.word.type,
         ' is correct?',
         input.toLowerCase() === state.word.type,
      );
      let correct = correctAnswers;
      if (input.toLowerCase() === state.word.type) correct += 1;
      setCorrectAnswers(correct);

      if (state.words[index])
         dispatch({
            type: actions.updateState,
            payload: { word: state.words[index] },
         });

      setTime(defaultTime);
      setInput('');
      if (index === state.words.length) submitTest({ correctAnswers: correct, total: state.words.length });
      else setIndex(index + 1);
   };

   return (
      <Style>
         <div className="circle">
            <h1>{time}s</h1>
         </div>
         <div className="Good" />
         <div className="Wrong" />
         <div className="Word">
            <h1>{state?.word?.display}</h1>
         </div>
         <div className="Input">
            <input
               type="text"
               placeholder="Twoja odpowiedź"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyPress={onKeyPressHandler}
               ref={inputRef}
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

         &:disabled {
            background: none;
         }
      }
   }

   .circle {
      position: absolute;
      background-color: ${colors.white};
      border: 1rem solid ${colors.green};
      width: 150px;
      height: 150px;
      left: 50%;
      top: 5%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${colors.green};
   }
`;

export default Typing;

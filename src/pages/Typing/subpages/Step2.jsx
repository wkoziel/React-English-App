import React, { useReducer, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CorrectAnswers from '../../../components/CorrectAnswers';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import { routes } from '../../../routes';
import { colors } from '../../../style';

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

const Step2 = ({ times = null, data = null, nextStep = null }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const [input, setInput] = useState('');
   const [showAnswer, setShowAnswer] = useState(false);

   const inputBorderRef = useRef();

   useEffect(() => {
      const firstWord = data[0];
      dispatch({ type: actions.updateState, payload: { words: data, word: firstWord } });
   }, []);

   const onKeyPressHandler = (e) => {
      if (e.code === 'Enter') checkInput();
   };

   const checkInput = () => {
      let tempWords,
         good = state.good,
         wrong = state.wrong;
      if (input === state.word.type) {
         console.log('input correct');
         inputBorderRef.current.style.borderColor = colors.green;
         good = good + 1;
         if (state.word.correct < times) {
            tempWords = state.words.map((word) =>
               word.id === state.word.id ? { ...word, correct: word.correct + 1 } : word,
            );
         } else {
            tempWords = state.words.map((word) => (word.id === state.word.id ? { ...word, learned: true } : word));
         }
      } else {
         console.log('input incorrect');
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
            inputBorderRef.current.style.borderColor = colors.lightGray;
            setShowAnswer(false);
         }
      }, 2000);
   };

   return (
      <Style>
         <div className="container">
            <div className="Back">
               <GoBack label="Powrót do lekcji" link={routes.lessons} />
            </div>
            <div className="Title">
               <LessonTitle label="1. Greetings" />
            </div>
            <div className="Top">
               <CorrectAnswers correct={state?.word?.correct} answers={times + 1} />
            </div>
            <div className="Main">
               {/* MAIN */}
               <div className="subcontainer">
                  <div className="Good">
                     <h2>{state?.good}</h2>
                     <div className="good"></div>
                  </div>
                  <div className="Wrong">
                     <h2>{state?.wrong}</h2>
                     <div className="bad"></div>
                  </div>
                  <div className="Questions">
                     <h1>
                        Pytanie {state?.word?.id + 1} / {data.length}
                     </h1>
                  </div>
                  <div className="Word">
                     <h1>{state?.word?.display}</h1>
                     {showAnswer && (
                        <>
                           <hr />
                           <h1 style={{ color: colors.green }}>{state?.word?.type}</h1>
                        </>
                     )}
                  </div>
                  <div className="Input" ref={inputBorderRef}>
                     <input
                        type="text"
                        placeholder="Twoja definicja"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={onKeyPressHandler}
                     />
                     <p>Wpisz definicje</p>
                  </div>
               </div>
            </div>
            {/* MAIN END */}
         </div>
      </Style>
   );
};

const Style = styled.div`
   height: 90vh;
   .container {
      height: 100%;
      display: grid;
      grid-template-columns: 0.4fr 2.2fr 0.4fr;
      grid-template-rows: 0.05fr 0.95fr;
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
      align-self: center;
      justify-self: center;
   }

   .Main {
      grid-area: Main;
      padding: 1rem 2rem;
      background-color: ${colors.white};
      border-radius: 20px;
      height: 100%;

      .subcontainer {
         height: 100%;
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
         flex-direction: column;
         align-items: center;
         justify-content: center;
         text-align: center;
         hr {
            border: 1px ${colors.lightGray} solid;
            width: 50%;
            margin: 0.5rem 0;
         }
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

export default Step2;

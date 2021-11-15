import React, { useState, useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../style';

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
const Quiz = ({ data = null }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const [showAnswer, setShowAnswer] = useState(false);

   useEffect(() => {
      const firstWord = data[0];
      dispatch({ type: actions.updateState, payload: { words: data, word: firstWord } });
   }, []);

   return (
      <Style>
         <div className="subcontainer white-box">
            <div className="Good">
               <h2>{state?.good}</h2>
               <div className="good"></div>
            </div>
            <div className="Wrong">
               <h2>{state?.wrong}</h2>
               <div className="bad"></div>
            </div>
            <div className="Questions">
               <div className="circle">
                  <h1 className="text-3">100%</h1>
               </div>
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
            <div className="Input"></div>
         </div>
      </Style>
   );
};

const Style = styled.div`
   height: 100%;
   .subcontainer {
      display: grid;
      grid-template-columns: 0.5fr 2.1fr 0.4fr;
      grid-template-rows: 0.4fr 1.3fr 1.3fr;
      gap: 0px 0px;
      grid-auto-flow: row;
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
      position: relative;
      .circle {
         position: absolute;
         background-color: ${colors.white};
         border: 1.5rem solid ${colors.green};
         width: 200px;
         height: 200px;
         left: 50%;
         top: 10%;
         border-radius: 50%;
         transform: translate(-50%, -50%);
         display: flex;
         align-items: center;
         justify-content: center;
         color: ${colors.green};
      }
   }

   .Word {
      grid-area: Word;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      hr {
         border: 1px ${colors.lightGray} solid;
         width: 50%;
         margin: 0.5rem 0;
      }
   }

   .Input {
      grid-area: Input;
   }
`;

export default Quiz;

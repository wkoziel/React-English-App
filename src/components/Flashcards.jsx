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
const Flashcards = ({ data = null, times = 0, nextStep = null }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const [displayedWords, setDisplayedWords] = useState([]);
   const [showAnswers, setShowAnswers] = useState(false);

   useEffect(() => {
      const firstWord = data[0];
      dispatch({ type: actions.updateState, payload: { words: data, word: firstWord } });
   }, []);

   return <Style></Style>;
};

const Style = styled.div``;

export default Flashcards;

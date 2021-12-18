import React, { createContext, useState, useContext } from 'react';
import styled from 'styled-components';
import Close from '../assets/exit.svg';
import { colors } from '../style';
import { AnimatePresence, motion } from 'framer-motion';
import transitions from '../helpers/transitions';
import Button from './Button';

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

const Modal = ({ children }) => {
   const [show, setShow] = useState(false);
   const [title, setTitle] = useState('');
   const [desc, setDesc] = useState('');

   const showModal = (t, d) => {
      setTitle(t);
      setDesc(d);
      setShow(true);
   };

   const closeModal = () => setShow(false);

   const values = { showModal };

   return (
      <ModalContext.Provider value={values}>
         {show && (
            <Background>
               <AnimatePresence>
                  <ModalWrapper {...transitions.opacity}>
                     <CloseButton onClick={() => closeModal()}>
                        <img src={Close} alt="Ikona zamknięcia" />
                     </CloseButton>
                     <h2>{title}</h2>
                     <p>{desc}</p>
                     <Button label="Zamknij" noArrow onClick={() => closeModal()} />
                  </ModalWrapper>
               </AnimatePresence>
            </Background>
         )}
         {children}
      </ModalContext.Provider>
   );
};

const Background = styled.div`
   width: 99vw;
   height: 100vh;
   overflow-x: hidden;
   background: rgba(160, 160, 160, 0.9);
   position: fixed;
   z-index: 2;
`;

const ModalWrapper = styled(motion.div)`
   width: 45vw;
   height: 45vh;
   background-color: ${colors.white};
   position: fixed;
   top: 40%;
   left: 50%;
   transform: translate(-50%, -50%);
   padding: 2rem;
   color: black;
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   align-items: center;
   text-align: center;
   border-radius: 20px;
   p {
      font-size: 1.5rem;
   }
`;

const CloseButton = styled.button`
   border: none;
   background: none;
   outline: none;
   position: absolute;
   cursor: pointer;
   right: 3rem;
   top: 3rem;
   transition: all 0.2s;

   &:hover {
      transform: scale(1.05);
   }
`;

export default Modal;

import React, { useState } from 'react';
import Button from './Button';
import styled from 'styled-components';
import { colors } from '../style';
import { deleteAccount } from '../api/api';
import { useGlobalContext } from '../context/global';
import { useHistory } from 'react-router-dom';
import { routes } from '../routes';
import { useModalContext } from './Modal';

const DeleteAccount = () => {
   const [isButton, setIsButton] = useState(false);

   const { username } = useGlobalContext();
   const { showModal } = useModalContext();

   const history = useHistory();

   const onClick = () => {
      try {
         const response = deleteAccount(username);
         if (response.data) showModal('Usuwanie konta', response.data.status);
      } catch (error) {
         console.log(error);
      } finally {
         history.push(routes.login);
      }
   };

   return (
      <Style>
         <h2 className="login">Usuń konto</h2>
         <h4>Operacja usunięcie konta jest nieodwracalna</h4>
         <h5>Czy na pewno chcesz to zrobić?</h5>

         {isButton ? (
            <>
               <h4 className="red">Kliknij aby ostatecznie usunąć:</h4>
               <Button label="Usuń konto" noArrow onClick={() => onClick()} />
            </>
         ) : (
            <Button label="Chce usunąć swoje konto" noArrow onClick={() => setIsButton(true)} />
         )}
      </Style>
   );
};

const Style = styled.div`
   display: flex;
   flex-direction: column;
   gap: 1rem;
   align-items: center;

   h2,
   h5 {
      margin: 0;
   }

   button {
      background: ${colors.red};
      border: none;
      color: ${colors.white};
   }
`;

export default DeleteAccount;

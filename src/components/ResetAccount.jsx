import React, { useState } from 'react';
import Button from './Button';
import styled from 'styled-components';
import { colors } from '../style';
import { resetAccount } from '../api/api';
import { useGlobalContext } from '../context/global';
import { useHistory } from 'react-router-dom';
import { routes } from '../routes';
import { useModalContext } from './Modal';

const ResetAccount = () => {
   const [isButton, setIsButton] = useState(false);

   const { username } = useGlobalContext();
   const { showModal } = useModalContext();

   const history = useHistory();

   const onClick = async () => {
      try {
         console.log('resetuj');
         const response = await resetAccount({ login: username });
         if (response.data) showModal('Resetowanie konta', 'Twoje konto zostało pomyślnie zresetowane');
      } catch (error) {
         console.log(error);
      } finally {
         history.push(routes.lessons);
      }
   };

   return (
      <Style>
         <h2 className="login">Zresetuj konto</h2>
         <h4>Reset spowoduje usunięcie danych postępu w lekcjach.</h4>
         <h4>Operacja resetu konta jest nieodwracalna</h4>
         <h5>Czy na pewno chcesz to zrobić?</h5>

         {isButton ? (
            <>
               <h4 className="red">Kliknij aby ostatecznie zresetować:</h4>
               <Button label="Resetuj" noArrow onClick={() => onClick()} />
            </>
         ) : (
            <Button label="Chce zresetować swoje konto" noArrow onClick={() => setIsButton(true)} />
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

export default ResetAccount;

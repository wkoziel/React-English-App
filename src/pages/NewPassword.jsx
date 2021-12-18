import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { sendNewPassword } from '../api/api';
import { routes } from '../routes';
import Navbar from '../components/Navbar';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Error from '../components/Error';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import clsx from 'clsx';
import styled from 'styled-components';
import { useState } from 'react';
import { colors, fonts } from '../style';
import { useModalContext } from '../components/Modal';

const NewPassword = () => {
   const queryParams = new URLSearchParams(window.location.search);
   const token = queryParams.get('token');
   const [message, setMessage] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const history = useHistory();

   const { showModal } = useModalContext();

   const schema = yup.object().shape({
      mail: yup.string().required('Podaj swój adres email'),
      password1: yup.string().required('Podaj nowe hasło'),
      password2: yup.string().required('Podaj nowe hasło'),
   });

   const { handleSubmit, register } = useForm({
      resolver: yupResolver(schema),
   });

   const onSubmit = async (data) => {
      if (data.password1 === data.password2) {
         try {
            setIsLoading(true);
            const { mail, password1 } = data;
            const response = await sendNewPassword(token, { mail, password: password1 });
            if (response.data) showModal('Przywracanie hasła', response.data.status);
         } catch (error) {
            console.log(error);
         } finally {
            history.push(routes.signIn);
            setIsLoading(true);
         }
      } else {
         setMessage('Hasła nie są takie same');
      }
   };

   return (
      <>
         <Navbar />
         <Style>
            <form onSubmit={handleSubmit(onSubmit)}>
               <h2 className="login">Zresetuj hasło</h2>
               {message && <Error message={message} />}
               <TextInput name="mail" ref={register} label="Email" placeholder="Wprowadź Email" />
               <TextInput type="password" name="password1" ref={register} label="Hasło" placeholder="Wprowadź hasło" />
               <TextInput
                  type="password"
                  name="password2"
                  ref={register}
                  label="Powtórz hasło"
                  placeholder="Wprowadź hasło"
               />
               <Button label={clsx(isLoading ? 'Wysyłanie...' : 'Wyślij')} noArrow type="submit" />
               <Link to={routes.signIn}>
                  Wróć do <strong>logowania</strong>
               </Link>
            </form>
         </Style>
      </>
   );
};

const Style = styled.div`
   height: 85vh;
   display: flex;
   justify-content: center;
   align-items: center;
   form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      background: ${colors.white};
      border: 1px solid ${colors.gray1};
      box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
      border-radius: 20px;
      padding: 2rem;

      input {
         font-size: 1rem;
      }

      .login {
         text-align: center;
         font-weight: bolder;
      }

      a {
         text-align: center;
         margin-top: 1.5rem;
      }

      input[type='checkbox'] {
         width: 15px;
         height: 15px;
         margin: 0 10px 0;
      }

      button {
         margin-top: 1rem;
         align-self: center;
         width: 90%;
         background: ${colors.green};
         color: ${colors.white};
         justify-content: center;
         font-family: ${fonts.lato};
         font-size: 0.75rem;
      }

      .flex {
         display: flex;
         justify-content: space-between;
         align-items: center;
         margin-top: 10px;
         a {
            margin: 0;
         }
      }
   }
`;

export default NewPassword;

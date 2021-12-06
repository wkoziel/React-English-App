import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Error from '../components/Error';
import TextInput from '../components/TextInput';
import { routes } from '../routes';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Button from '../components/Button';
import styled from 'styled-components';
import { colors, fonts } from '../style';
import { remindPassword } from '../api/api';
import { useHistory } from 'react-router';

const ForgottenPassword = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [message, setMessage] = useState('');

   const history = useHistory();

   const schema = yup.object().shape({
      mail: yup.string().required('Podaj swój adres email'),
   });

   const { handleSubmit, register } = useForm({
      resolver: yupResolver(schema),
   });

   const onSubmit = async (data) => {
      try {
         setIsLoading(true);
         const response = await remindPassword(data);
         if (response.data.status) {
            const { status } = response.data;
            if (status === 'Wysłano mail') {
               alert('Email z linkiem został wysłany na podany email');
               history.push(routes.signIn);
            } else setMessage(status);
         }
      } catch (error) {
         console.error(error);
      } finally {
         setIsLoading(false);
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
               <Button label={clsx(isLoading ? 'Wysyłanie...' : 'Wyślij')} noArrow type="submit" />
               <Link to={routes.signUp}>
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

export default ForgottenPassword;

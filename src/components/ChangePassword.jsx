import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Error from '../components/Error';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import clsx from 'clsx';
import { changeUserPassword } from '../api/api';
import { useGlobalContext } from '../context/global';
import { useModalContext } from './Modal';

const ChangePassword = () => {
   const { username } = useGlobalContext();
   const { showModal } = useModalContext();

   const [message, setMessage] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const schema = yup.object().shape({
      password1: yup.string().required('Podaj nowe hasło'),
      password2: yup.string().required('Powtórz nowe hasło'),
   });

   const { handleSubmit, register } = useForm({
      resolver: yupResolver(schema),
   });

   const onSubmit = async (data) => {
      if (data.password1 === data.password2) {
         try {
            setIsLoading(true);
            const { password1 } = data;
            console.log('Reset data:', { login: username, password: password1 });
            const response = await changeUserPassword({ login: username, password: password1 });
            if (response.data) showModal('Zmiana hasła', 'Wprowadzone przez Ciebie hasło zostało uaktualnione');
         } catch (error) {
            console.log(error);
         } finally {
            setIsLoading(false);
         }
      } else setMessage('Hasła nie są takie same');
   };

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="login">Zmień hasło</h2>
            <p>Tutaj mozesz edytować swoje hasło podawane w czasie logowania</p>
            {message ? <Error message={message} /> : null}
            <TextInput type="password" name="password1" ref={register} label="Hasło" placeholder="Wprowadź hasło" />
            <TextInput
               type="password"
               name="password2"
               ref={register}
               label="Powtórz hasło"
               placeholder="Powtórz nowe hasło"
            />
            <Button label={clsx(isLoading ? 'Wysyłanie...' : 'Wyślij')} noArrow type="submit" />
         </form>
      </>
   );
};

export default ChangePassword;

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import clsx from 'clsx';
import { useState } from 'react';

const EditUserData = ({ user = null }) => {
   const [isLoading, setIsLoading] = useState(false);

   const schema = yup.object().shape({
      password1: yup.string().required('Podaj nowe hasło'),
      password2: yup.string().required('Podaj nowe hasło'),
   });

   const { handleSubmit, register } = useForm({
      resolver: yupResolver(schema),
      defaultValues: { user },
   });

   const onSubmit = () => {};

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <h2 className="login">Edytuj swoje dane</h2>
         <p>Tutaj mozesz edytować dane widoczne na profilu użytkownika</p>
         <TextInput name="name" ref={register} label="Twoje imię" placeholder="Podaj swoje imie" />
         <TextInput name="surname" ref={register} label="Twoje nazwisko" placeholder="Podaj swoje nazwisko" />
         <Button label={clsx(isLoading ? 'Wysyłanie...' : 'Wyślij')} noArrow type="submit" />
      </form>
   );
};

export default EditUserData;

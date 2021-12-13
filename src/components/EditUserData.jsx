import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import clsx from 'clsx';
import { useState } from 'react';
import RadioButton from '../components/RadioButton';
import { updateUserProfile } from '../api/api';
import { useGlobalContext } from '../context/global';
import { useHistory } from 'react-router-dom';
import { routes } from '../routes';

const EditUserData = ({ user = null }) => {
   const [isLoading, setIsLoading] = useState(false);

   const history = useHistory();

   const { username } = useGlobalContext();

   const schema = yup.object().shape({
      name: yup.string().required('Podaj swoje imię').max(10),
      surname: yup.string().required('Podaj swoje nazwisko').max(10),
      gender: yup.string(),
   });

   const {
      handleSubmit,
      register,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: { ...user },
   });

   const onSubmit = (data) => {
      try {
         setIsLoading(true);
         const { name, surname, gender } = data;
         console.log({ login: username, name, surname, gender });
         const response = updateUserProfile({ login: username, name, surname, gender });
         if (response.data) {
            console.log(response.data?.status);
         }
      } catch (error) {
         console.log(error);
      } finally {
         history.push(routes.profile);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <h2 className="login">Edytuj swoje dane</h2>
         <p>Tutaj mozesz edytować dane widoczne na profilu użytkownika</p>
         <TextInput
            name="name"
            ref={register}
            label="Twoje imię"
            placeholder="Podaj swoje imie"
            error={errors?.name?.message}
         />
         <TextInput
            name="surname"
            ref={register}
            label="Twoje nazwisko"
            placeholder="Podaj swoje nazwisko"
            error={errors?.surname?.message}
         />
         <div className="radiobuttons">
            <span>Płeć:</span>
            <RadioButton label="Mężczyzna" value="M" name="gender" id="M" ref={register} checked />
            <RadioButton label="Kobieta" value="F" name="gender" id="F" ref={register} />
            <RadioButton label="Inna" value="N" name="gender" id="N" ref={register} />
         </div>
         <Button label={clsx(isLoading ? 'Wysyłanie...' : 'Wyślij')} noArrow type="submit" />
      </form>
   );
};

export default EditUserData;
import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import clsx from 'clsx';

const ChangeDailyGoal = ({ dailyGoal = null }) => {
   const [isLoading, setIsLoading] = useState(false);

   const schema = yup.object().shape({
      name: yup.string().required('Podaj swoje imię'),
      surname: yup.string().required('Podaj swoje nazwisko'),
   });

   const { handleSubmit, register } = useForm({
      resolver: yupResolver(schema),
      defaultValues: { dailyGoal },
   });

   const onSubmit = () => {};

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <p>Zmień swój dzienny cel słówek</p>
         <h2 className="login">Zmień swój dzienny</h2>
         <label htmlFor="daily">Dzienny cel</label>
         <input type="range" id="daily" name="daily" min={10} max={60} step={5} />
         <div className="steps">
            <span>10</span>
            <span>20</span>
            <span>30</span>
            <span>40</span>
            <span>50</span>
            <span>60</span>
         </div>
         <Button label={clsx(isLoading ? 'Wysyłanie...' : 'Wyślij')} noArrow type="submit" />
      </form>
   );
};

export default ChangeDailyGoal;

import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import clsx from 'clsx';
import { useGlobalContext } from '../context/global';
import { updateDailyGoal } from '../api/api';
import { useHistory } from 'react-router-dom';
import { routes } from '../routes';

const ChangeDailyGoal = ({ dailyGoal = null }) => {
   const [isLoading, setIsLoading] = useState(false);

   const history = useHistory();

   const { username } = useGlobalContext();
   const schema = yup.object().shape({
      name: yup.number(),
   });

   const { handleSubmit, register } = useForm({
      resolver: yupResolver(schema),
      defaultValues: { dailyGoal },
   });

   const onSubmit = (data) => {
      try {
         setIsLoading(true);
         console.log(data);
         const response = updateDailyGoal({ login: username, daily_goal: data.dailyGoal });
         if (response.data) alert(response.data);
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
         history.push(routes.lessons);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <h2 className="login">Zmień swój dzienny</h2>
         <p>Zmień swój dzienny cel słówek</p>
         <label htmlFor="daily">Dzienny cel</label>
         <input type="range" id="daily" name="daily" min={10} max={60} step={5} {...register('dailyGoal')} />
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

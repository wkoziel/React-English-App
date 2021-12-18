import React from 'react';
import { useHistory } from 'react-router';
import { activateAccount } from '../api/api';
import Loading from '../components/Loading';
import { routes } from '../routes';
import { useEffect } from 'react';
import { useModalContext } from '../components/Modal';

const EmailConfirm = () => {
   const queryParams = new URLSearchParams(window.location.search);
   const token = queryParams.get('token');
   console.log('Otrzymano token', token);

   const history = useHistory();

   const { showModal } = useModalContext();

   useEffect(() => {
      const sendToken = async () => {
         try {
            const response = await activateAccount(token);
            if (response.data) showModal('Potwierdzanie adresu email', response.data.status);
         } catch (error) {
            console.log(error);
         } finally {
            history.push(routes.signIn);
         }
      };
      sendToken();
   }, []); //eslint-disable-line
   return <Loading />;
};

export default EmailConfirm;

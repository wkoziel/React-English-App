import React, { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../context/global';
import uploadFileToBlob from '../helpers/azureBlob';
import styled from 'styled-components';
import { colors, fonts } from '../style';
import Loading from './Loading';
import Loader from 'react-loader-spinner';
import Button from '../components/Button';
import { getUserPhoto, userChangePhoto } from '../api/api';
import clsx from 'clsx';
import { routes } from '../routes';
import { useHistory } from 'react-router-dom';

const url = 'https://limistorage.blob.core.windows.net/profile-pics/';

const FileUpload = () => {
   const { username } = useGlobalContext();
   const [fileSelected, setFileSelected] = useState(null);
   const [file, setFile] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [userPhoto, setUserPhoto] = useState({});

   const history = useHistory();

   const ref = useRef();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const responseUser = await getUserPhoto(username);
            if (responseUser.data) setUserPhoto(responseUser.data.photo);
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchData();
   }, []); //eslint-disable-line

   const [uploading, setUploading] = useState(false);
   const [inputKey, setInputKey] = useState(Math.random().toString(36));

   const onFileChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onabort = () => console.error('file reading was aborted');
      reader.onerror = () => console.error('file reading has failed');
      if (file) reader.readAsDataURL(file);
      reader.onload = () => {
         const binaryStr = reader.result;
         setFileSelected({ binary: binaryStr, file });
      };

      const myFile = new File([e.target.files[0]], `${username}_profilepic.jpeg`);
      setFile(myFile);
   };

   const onFileUpload = async () => {
      try {
         setUploading(true);
         await uploadFileToBlob(file);
         setFileSelected(null);
         setUploading(false);
         setInputKey(Math.random().toString(36));
         const response = userChangePhoto({ login: username, photo: `${url}${username}_profilepic.jpeg` });
         if (response.data) alert(response.data.status);
      } catch (error) {
         console.log(error);
      } finally {
         history.go(routes.profile);
      }
   };

   return (
      <Style>
         <h2>Zmień swoje zdjęcie profilowe</h2>
         <p>Tutaj możesz uaklualnić swoje zdjęcie profilowe</p>
         <div>
            <img src={fileSelected?.binary || userPhoto} alt="Zdjęcie użytkownika" />
            <div>
               <h5>{fileSelected?.file?.name || 'Nie wybrano żadnego zdjęcia'}</h5>
               <button className="fileBtn" type="button" onClick={() => ref.current.click()}>
                  Dodaj nowy plik
               </button>
               <Button
                  label={clsx(uploading ? 'Wysyłanie..' : 'Wyślij plik')}
                  disabled={!fileSelected?.file?.name || isLoading}
                  noArrow
                  onClick={() => onFileUpload()}
               />
            </div>
         </div>

         <input type="file" onChange={onFileChange} key={inputKey || ''} ref={ref} style={{ display: 'none' }} />
      </Style>
   );
};

const Style = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   & > div {
      display: flex;
      gap: 3rem;
      background: rgba(20, 223, 176, 0.4);
      padding: 3rem;
      border-radius: 2rem;
      max-width: 800px;
      width: 100%;

      img:nth-child(1) {
         width: 200px;
         height: 200px;
         border-radius: 50%;
      }

      & > div {
         display: flex;
         flex-direction: column;
         justify-content: space-around;
         align-items: center;
      }
   }
   .fileBtn {
      border: none;
      background: none;
      outline: none;
      cursor: pointer;
      text-decoration: underline;
      color: ${colors.black};
      font-size: 1.5rem;
   }
`;

export default FileUpload;
